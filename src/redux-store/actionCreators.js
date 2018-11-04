import { fetch } from 'lib/helpers';
import { FETCH_GITHUB_ACCOUNT } from 'routes';
import { UPDATE_STATE } from './constants';
import { extractNextLink } from 'lib/helpers';
import { toast } from 'react-toastify';
import undefsafe from 'undefsafe';

export function updateState(payload) {
    return {
        type: UPDATE_STATE,
        payload
    };
}

export function fetchAccount(githubProfile, onComplete=null) {
    return async dispatch => {
        dispatch(updateState({loading: true, accountData: null}));
        try {
            const profileUrl = `${FETCH_GITHUB_ACCOUNT}/${githubProfile}`;
            const reposUrl = `${profileUrl}/repos`;
            const profileResponse = await fetch(profileUrl);
            const reposResponse = await fetch(reposUrl)
            const moreReposLink = reposResponse.headers.link;
            var statePayload = {
                repos: reposResponse.data,
                accountData: profileResponse.data,
                moreRepos: moreReposLink ? extractNextLink(moreReposLink) : null
            };

            dispatch(updateState(statePayload));
            if (onComplete) {
                onComplete();
            }
        } catch (e) {
            const errorMessage = undefsafe(e, 'response.data.message');
            const defaultMessage = 'Failed to load page, please refresh or try again later!';
            toast.error(errorMessage || defaultMessage);
        }
        dispatch(updateState({loading: false}));
    }
}

export function fetchMoreRepos(url, repos) {
    return async dispatch => {
        dispatch(updateState({loadingMoreRepos: true}));
        try {
            const response = await fetch(url);
            const moreReposLink = response.headers.link;
            const statePayload = {
                repos: response.data.concat(repos),
                moreRepos: moreReposLink ? extractNextLink(moreReposLink) : null,
                moreCommits: null
            }

            dispatch(updateState(statePayload));
        } catch (e) {
            const errorMessage = undefsafe(e, 'response.data.message');
            const defaultMessage = 'Failed to load more, please refresh or try again later';
            toast.error(errorMessage || defaultMessage);
        }
        dispatch(updateState({loadingMoreRepos: false}));
    }
}

export function fetchCommits(commitUrl, onSuccess=null,  commits=null) {
    return async dispatch => {
        if (commits) {
            dispatch(updateState({fetchingCommits: true}));    
        } else {
            dispatch(updateState({loading: true}));
        }

        try {
            const response = await fetch(commitUrl);
            const moreCommitsLink = response.headers.link;
            const statePayload = {
                commits: response.data.concat(commits || []),
                moreCommits: moreCommitsLink ? extractNextLink(moreCommitsLink) : null
            }
            dispatch(updateState(statePayload));

            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch(e) {
            const errorMessage = undefsafe(e, 'response.data.message');
            const defaultMessage = 'Failed to load commits';
            toast.error(errorMessage || defaultMessage);
        }

        dispatch(updateState({fetchingCommits: false, loading: false}));    
    }
}