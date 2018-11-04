import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar';
import { linkify } from 'lib/helpers';
import './style.css';

const Sidebar = props => {
    const data = props.accountData || {};

    const renderAccountInfo = () => (
        <div className="account-info-section">
            <p className="truncate">
                <i className="fa fa-fw fa-map-marker" /> {data.location || 'Unavailable'}
            </p>
            <p className="truncate">
                <i className="fa fa-fw fa-link" /> {linkify(data.url)}
            </p>
            <p className="truncate">
                <i className="fa fa-fw fa-envelope" /> {data.email || 'Unavailable'}
            </p>
            <p className="truncate">
                <i className="fa fa-fw fa-star" /> {data.followers} followers
            </p>
            <p className="truncate">
                <i className="fa fa-fw fa-building" /> {data.company || 'Unavailale'}
            </p>
            <p className="truncate">
                <i className="fa fa-fw fa-folder" /> {data.public_repos} Repositories
            </p>
        </div>
    )
    
    var classname = 'sidebar-wrapper ';
    classname += props.accountData ? '' : 'blur-out'

    return (
        <div className={classname}>
            { props.accountData && <Avatar 
                name={data.name}
                photoUrl={data.avatar_url} /> }
            { props.accountData && renderAccountInfo() }
        </div>
    )
}

Sidebar.propTypes = {
    accountData: PropTypes.object
}

export default Sidebar;