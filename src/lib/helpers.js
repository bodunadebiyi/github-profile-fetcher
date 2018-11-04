import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'redux-store/actionCreators';

export const linkify = (url) => {
    return <a href={url}>{url}</a>
}

export function connectToStore(component, stateFields=null) {
    function mapStateToProps(state) {
        return getMappedStates(state, stateFields);
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(actionCreators, dispatch);
    }

    function getMappedStates(state, fieldsToMap=null) {
        let mapping = {};

        if (fieldsToMap) {
            fieldsToMap.forEach(element => {
                return mapping[element] = state[element];
            });
        } else {
            Object.keys(state).forEach(element => {
                return mapping[element] = state[element];
            });
        }

        return mapping;
    }

    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export function fetch(url, requestType='GET', payload=null, headerOptions={}) {
    axios.defaults.baseURL = process.env.REACT_APP_NEXUS_API;
    const generateRequestOptions = () => {
        const options = { url, method: requestType };
        if (payload) options.data = payload;

        return { ...options, ...(headerOptions || {}) };
    }
    const requestOptions = generateRequestOptions();

    return axios.request(requestOptions)
}

export function extractNextLink(payload) {
    const splitUrl = payload.split(',');
    var nextLinkFragment = splitUrl.filter(e => e.includes('next'))[0];

    if (!nextLinkFragment) return null;
    nextLinkFragment = nextLinkFragment.trim();

    const regexMatcher = /^<(http.*)>/.exec(nextLinkFragment);
    return regexMatcher[1];
}

export function isBottom(el) {
    return (el.scrollHeight - el.scrollTop) === el.clientHeight;
}