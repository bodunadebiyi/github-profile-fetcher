import React, { Component } from 'react';
import { connectToStore } from 'lib/helpers';
import { ToastContainer, toast } from 'react-toastify';
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import Sidebar from 'components/Sidebar';
import ReposList from 'components/ReposList';
import CommitsList from 'components/CommitsList';
import Loading from 'components/Loading';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.filterCommits = this.filterCommits.bind(this);
    this.backToRepos = this.backToRepos.bind(this);
    this.clickRepo = this.clickRepo.bind(this);
    this.state = { 
      showCommits: false,
      filteredCommits: null,
      selectedRepo: ''
    }
  }

  setView(setToCommitPage) {
    this.setState({showCommits: setToCommitPage});
  }

  filterCommits(filter) {
    const filterText = filter.trim().toLowerCase();
    const filterCommits = e => e.commit.message.toLowerCase().includes(filterText);

    if (filterText && this.props.commits) {
      this.setState({filteredCommits: this.props.commits.filter(filterCommits)});
    } else {
      this.setState({filteredCommits: null})
    }
  }

  backToRepos() {
    this.setState({ showCommits: false });
  }

  clickRepo(commitUrl, repoFullName) {
    this.props.fetchCommits(commitUrl, () => {
      this.setView(true);
      this.setState({ selectedRepo: repoFullName });
    });
  }

  renderMainContent() {
    if (this.props.loading) {
      return <Loading />
    } else if (this.state.showCommits) {
      return <CommitsList 
        filterCommits={this.filterCommits}
        commits={this.state.filteredCommits || this.props.commits}
        moreCommitsLink={this.props.moreCommits}
        loadingMore={this.props.fetchingCommits}
        loadMore={this.props.fetchCommits}
        backToRepos={this.backToRepos}
        repoName={this.state.selectedRepo}
      />
    } else {
      return <ReposList 
        repos={this.props.repos} 
        moreReposLink={this.props.moreRepos}
        onClickRepo={this.clickRepo}
        loadMore={this.props.fetchMoreRepos}
        loadingMore={this.props.loadingMoreRepos}
      />
    }
  }

  render() {
    return (
      <div className="App">
        <ToastContainer 
          position={toast.POSITION.TOP_CENTER} 
          autoClose={8000} />
        <Header />
        <div className="container-fluid">
          <Sidebar accountData={this.props.accountData} />
          <SearchBar 
            fetchAccount={this.props.fetchAccount}
            updateUsername={this.props.updateState} 
            setView={this.setView.bind(this)}
            username={this.props.username} />
          <div className="main-content">
            {this.renderMainContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStore(App);
