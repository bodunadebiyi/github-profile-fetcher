import { UPDATE_STATE } from './constants';

export const defaultState = {
    fetchingGithubAccount: false,
    fetchingRepos: false,
    fetchingCommits: false,
    accountData: null,
    repos: null,
    commits: null,
    username: '',
    loading: false,
    status: false
}

export default function(state=defaultState, action) {
    switch(action.type) {
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default:
            return state;
    }
}