import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import './style.css';

const SearchBar = (props) => {
    const onEnterUsername = e => {
        props.updateUsername({username: e.target.value});
    }

    const onSubmitSearchForm = (e) => {
        e.preventDefault();
        if (props.username) {
            props.fetchAccount(props.username, () => { props.setView(false)});
        } else {
            toast.error('Please enter a github username');
        }
    }

    return (
        <div className="search-bar-wrapper">
            <form onSubmit={onSubmitSearchForm}>
                <div className="search-container">
                    <input 
                        className="search-input"
                        placeholder="Please enter your github username" 
                        onChange={onEnterUsername}
                        value={props.username || ''}
                        required />
                    <button type="submit" className="search-button">
                        Find Profile
                    </button>
                </div>
            </form>
        </div>
    )
}

SearchBar.propTypes = {
    fetchAccount: PropTypes.func.isRequired,
    updateUsername: PropTypes.func.isRequired,
    username: PropTypes.string
}

export default SearchBar;