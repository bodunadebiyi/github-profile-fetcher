import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Avatar = props => {
    return (
        <div className="avatar-wrapper">
            <img src={props.photoUrl} alt="user-avatar"/>
            <h3>{props.name}</h3>
        </div>
    )
}

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired
}

export default Avatar;