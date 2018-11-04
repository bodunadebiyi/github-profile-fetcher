import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('Tests for Header Component', () => {
    const wrapper = shallow(<Header />);

    it ('displays site header text', () => {
        const headerText = wrapper.find('h1').text();
        expect(headerText).toEqual('GitHUB Profile Fetcher');
    });

    it ('displays header logo', () => {
        const headerLogo = wrapper.find('img');
        expect(headerLogo.length).toEqual(1);
    });

    it('image logo has className of "App-logo"', () => {
        const headerLogo = wrapper.find('img');
        expect(headerLogo.hasClass('App-logo')).toEqual(true);
    });
});