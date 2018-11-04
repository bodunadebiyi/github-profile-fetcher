import React from 'react';
import logo from 'assets/logo1.png';
import './style.css';

export default () => {
    return (
        <header className="App-header">
            <h1>GitHUB Profile Fetcher</h1>
            <img src={logo} className="App-logo" alt="logo" />
        </header>
    )
}