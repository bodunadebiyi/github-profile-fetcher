import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './index';
import Avatar from 'components/Avatar';
import { accountData } from 'lib/data';

describe('Tests for Sidebar Component', () => {
    const containerProps = null;
    const wrapper = shallow(<Sidebar accoundData={containerProps} />);

    it('should be blurred out when no accountData props is present', () => {
        expect(wrapper.find('.sidebar-wrapper').hasClass('blur-out')).toEqual(true);
    });

    it('should NOT be blurred out when accountData props is present', () => {
        wrapper.setProps({ accountData })
        expect(wrapper.find('.sidebar-wrapper').hasClass('blur-out')).toEqual(false);
    });

    it('should display user avatar when accountData is present', () => {
        wrapper.setProps({ accountData })
        expect(wrapper.find(Avatar).length).toEqual(1);
    });

    it('should display the accurate account info if accountData is present', () => {
        wrapper.setProps({ accountData })
        const info = wrapper.find('.account-info-section p');

        expect(wrapper.find('.account-info-section').length).toEqual(1);
        expect(info.at(0).text().includes(accountData.location)).toEqual(true);
        expect(info.at(1).text().includes(accountData.url)).toEqual(true);
        expect(info.at(2).text().includes(accountData.email)).toEqual(true);
        expect(info.at(3).text().includes(accountData.followers)).toEqual(true);
        expect(info.at(4).text().includes(accountData.company)).toEqual(true);
        expect(info.at(5).text().includes(accountData.public_repos)).toEqual(true);
    });
});