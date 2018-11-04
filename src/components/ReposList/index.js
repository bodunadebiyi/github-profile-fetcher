import React from 'react';
import PropTypes from 'prop-types';
import { isBottom } from 'lib/helpers';
import './style.css';

class ReposList extends React.Component {
    constructor(props) {
        super(props);
        this.generateReposList = this.generateReposList.bind(this);
        this.renderReposSection = this.renderReposSection.bind(this);
        this.renderWelcomeMessage = this.renderWelcomeMessage.bind(this);
    }

    componentDidMount() {
        this.wrapperElement.addEventListener('scroll', this.trackScrolling);
    }
      
    componentWillUnmount() {
        this.wrapperElement.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => { 
        if (isBottom(this.wrapperElement) && this.props.moreReposLink && !this.props.loadingMore) {
            this.props.loadMore(this.props.moreReposLink, this.props.repos);
        }
    };

    clickRepo(repo) {
        const commitURL = repo.commits_url.replace('{/sha}', '');
        this.props.onClickRepo(commitURL, repo.full_name);
    }

    generateReposList (e, i) {
        return (
            <div 
                key={i} 
                className="repo-container"
                onClick={this.clickRepo.bind(this, e)}>
                <h3>{e.full_name}</h3>
                <p>{e.description || 'description is unavailable'}</p>
                <span><i className="fa fa-eye" /> {e.private ? 'Private' : 'Public'}</span>
                <span><i className="fa fa-bug"/> {e.open_issues_count} issues</span>
            </div>
        )
    }

    renderReposSection(repos) {
        return (
            <div>
                <h3>Repositories</h3>
                {repos.map(this.generateReposList)}
                {this.props.loadingMore && <p className="text-center loading-more">Loading More...</p>}
            </div>
        )
    }

    renderWelcomeMessage() {
        return (
            <div className="welcome-message text-center">
                <i className="fa fa-search fa-3x" />
                <p>Find your GitHub Profiles Now!</p>
            </div>
        )
    }

    render() {
        return (
            <div className="repo-list-wrapper" ref={e => this.wrapperElement = e}>
                {this.props.repos ? this.renderReposSection(this.props.repos) : this.renderWelcomeMessage()}
            </div>
        )
    }
}

ReposList.propTypes = {
    repos: PropTypes.array,
    moreReposLink: PropTypes.string,
    onClickRepo: PropTypes.func,
    loadMore: PropTypes.func,
    loadingMore: PropTypes.bool
}

export default ReposList;