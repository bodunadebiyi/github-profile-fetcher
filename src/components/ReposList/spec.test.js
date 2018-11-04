import React from 'react';
import { mount } from 'enzyme';
import ReposList from 'components/ReposList'
import { repos } from 'lib/data';

describe('Test ReposList Component', () => {
    const moreRepos = "https://api.github.com/user/69631/repos?page=2";
    const onClickRepo = jest.fn();
    const loadMore = jest.fn();

    const wrapper = mount(<ReposList 
        moreReposLink={moreRepos}
        onClickRepo={onClickRepo}
        loadMore={loadMore}
    />)

    it('renders div wrapper properly', () => {
        const wrapperDiv = wrapper.find('.repo-list-wrapper');
        expect(wrapperDiv.length).toEqual(1);
    });

    it('should show welcome message if repos ain\'t present', () => {
        wrapper.setProps({repos: null});

        const welcomeMessage = wrapper.find('.welcome-message');
        expect(welcomeMessage.length).toEqual(1);
    });

    it('should show repos list when repos is present', () => {
        wrapper.setProps({ repos });

        const reposList = wrapper.find('.repo-container');
        expect(reposList.length).toEqual(repos.length);
    });

    it('should "loading More..." when loadingMore prop is true', () => {
        wrapper.setProps({loadingMore: true});

        const loadMoreElement = wrapper.find('.loading-more');
        expect(loadMoreElement.length).toEqual(1);
        expect(loadMoreElement.text()).toEqual('Loading More...');
    });
});