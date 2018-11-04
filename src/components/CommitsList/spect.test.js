import React from 'react';
import { mount } from 'enzyme';
import CommitsList from 'components/CommitsList'
import { commits } from 'lib/data';

describe('Test ReposList Component', () => {
    const defaultProps = {
        moreCommitsLink: "https://api.github.com/repositories/75691991/commits?page=5",
        loadMore: jest.fn(),
        filterCommits: jest.fn(),
        onClickRepo: jest.fn(),
        loadingMore: false,
        backToRepos: jest.fn(),
        repoName: 'laravel/art',
        commits
    }


    const wrapper = mount(<CommitsList {...defaultProps} />)

    it('renders container properly', () => {
        const wrapperDiv = wrapper.find('.commits-list-wrapper');
        const backButton = wrapper.find('.back-button');
        const pageHeader = wrapper.find('.commits-list-wrapper > h1');

        expect(backButton.length).toEqual(1);
        expect(backButton.text().includes('Back to repos')).toEqual(true);
        expect(wrapperDiv.length).toEqual(1);
        expect(pageHeader.text()).toEqual(`Commits for ${defaultProps.repoName}`);
    });

    it('should call #props.backToRepos when back button is clicked', () => {
        const backButton = wrapper.find('.back-button');
        backButton.simulate('click');
        expect(defaultProps.backToRepos).toHaveBeenCalled();
    });

    it('should show commits list when commits is present', () => {
        const commitsContainer = wrapper.find('.commits-content');
        expect(commitsContainer.length).toEqual(commits.length);
    });

    it('should "loading More..." when loadingMore prop is true', () => {
        wrapper.setProps({loadingMore: true});

        const loadMoreElement = wrapper.find('.loading-more');
        expect(loadMoreElement.length).toEqual(1);
        expect(loadMoreElement.text()).toEqual('Loading More...');
    });
});