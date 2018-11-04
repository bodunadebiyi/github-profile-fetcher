import React from 'react';
import Avatar from './index';
import { shallow } from 'enzyme';

describe('Avatar Component', () => {
    const wrapper = shallow(<Avatar 
        name="Bodunde" 
        photoUrl="http://writingexercises.co.uk/images2/randomimage/boat.jpg" 
    />);

    it ('shows name props in h3 text', () => {
        const nameText = wrapper.find('h3').text();
        expect(nameText).toEqual('Bodunde');
    });

    it('renders only image avatar', () => {
        const img = wrapper.find('img');
        expect(img.length).toEqual(1);
    });

    it('renders a component with wrapper className of "avatar-wrapper"', () => {
        expect(wrapper.find('div').hasClass('avatar-wrapper')).toEqual(true);
    });
})