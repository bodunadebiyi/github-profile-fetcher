import React from 'react';
import { shallow } from 'enzyme';
import Loading from './index';

describe('Tests for Loading Component', () => {
    it('renders an image with className "loading"', () => {
        const wrapper = shallow(<Loading />)
        expect(wrapper.find('img').length).toEqual(1);
        expect(wrapper.find('img').hasClass('loading')).toEqual(true);
    });
});