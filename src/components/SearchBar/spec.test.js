import React from 'react';
import { mount} from 'enzyme';
import SearchBar from './index';

describe('Tests for SearchBar Component', () => {
    const fetchAccount = jest.fn();
    const updateUsername = jest.fn();

    const wrapper = mount(<SearchBar  
        fetchAccount={fetchAccount}
        updateUsername={updateUsername}
        username={'username'}
    />)


    it('should have a container wrapper with className "search-bar-wrapper"', () => {
        expect(wrapper.find('.search-bar-wrapper').length).toEqual(1);
    });

    it('should have an input field', () => {
        expect(wrapper.find('input').length).toEqual(1);
    });

    it('should have a button', () => {
        expect(wrapper.find('button').length).toEqual(1);
    });

    it('button should have find profile text', () => {
        expect(wrapper.find('button').text()).toEqual('Find Profile');
    });

    it('should call #updateUsername when the input field changes', () => {
        const inputField = wrapper.find('input');
        inputField.simulate('change', { target: {value: 'name'}});
        expect(updateUsername).toHaveBeenCalled()
    });

    it('should not call #fetchAccount when user submits an empty form', () => {
        const formField = wrapper.find('form');
        wrapper.setProps({username: null});
        formField.simulate('submit', { preventDefault: jest.fn() });
        expect(fetchAccount).not.toHaveBeenCalled();
    });

    it('should call #fetchAccount when user submits the form', () => {
        const formField = wrapper.find('form');
        wrapper.setProps({username: 'bodunde'});
        formField.simulate('submit', { preventDefault: jest.fn() });
        expect(fetchAccount).toHaveBeenCalled();
    });
});