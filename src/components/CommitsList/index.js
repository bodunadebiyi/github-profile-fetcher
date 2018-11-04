import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { isBottom } from 'lib/helpers';
import './style.css';

class CommitsList extends React.Component {   
    constructor(props) {
        super(props);
        this.state = { filter: ''}
    } 
    componentDidMount() {
        this.wrapperElement.addEventListener('scroll', this.trackScrolling);
    }
    
    componentWillUnmount() {
        this.wrapperElement.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => { 
        if (isBottom(this.wrapperElement) && this.props.moreCommitsLink && !this.props.loadingMore && !this.state.filter) {
            this.props.loadMore(this.props.moreCommitsLink, null, this.props.commits);
        }
    };

    onEnterFilter(e) {
        this.setState({filter: e.target.value});
        this.props.filterCommits(e.target.value);
    }

    generateCommits(e, i) {
        const dateCommitted = moment(e.commit.committer.date).format('DD MMM YYYY');
        const committer = e.committer || e.commit.committer;
        return (
            <div className="commits-content" key={i}>
                <h3>{e.commit.message}</h3>
                <p>{e.sha.substring(0, 7)}</p>
                <div>
                    {committer.avatar_url && <img src={committer.avatar_url} alt="committer_thumb" />}
                    <span>{committer.login || committer.name}</span> committed on {dateCommitted}
                </div>
            </div>
        )
    }

    renderCommits(commits) {
        return commits.map(this.generateCommits)
    }

    render() {
        return (
            <div className="commits-list-wrapper" ref={e => this.wrapperElement = e}>
                <span 
                    className="back-button"
                    onClick={this.props.backToRepos}>
                    <i className="fa fa-arrow-left" /> Back to repos
                </span>
                <input  
                    className="filter-commits" 
                    placeholder="search-commits"
                    value={this.state.filter} 
                    onChange={this.onEnterFilter.bind(this)} />
                <h1>Commits for {this.props.repoName}</h1>
                {this.props.commits && this.renderCommits(this.props.commits)}
                {this.props.loadingMore && <p className="text-center loading-more">Loading More...</p>}
            </div>
        )
    }
}

CommitsList.propTypes = {
    filterCommits: PropTypes.func,
    commits: PropTypes.array,
    moreCommitsLink: PropTypes.string,
    loadingMore: PropTypes.bool,
    loadMore: PropTypes.func,
    backToRepos: PropTypes.func,
    repoName: PropTypes.string
}

export default CommitsList;