import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {approveUser} from '../../actions/admin';

const UserItem = ({user, approveUser}) => {

    const {_id, name, avatar, branch, year} = user;

    return (
        <div>
            <div className="profile">
                <div className="round">
                    <img src={avatar} alt=""/>
                </div>              
                <div className="profile-details">
                    <h2>{name}</h2>
                    <p>{year} - {branch}</p>
                    <button className="btn btn-green" onClick={() => approveUser(_id)}>Approve</button>    
                </div>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
    approveUser: PropTypes.func.isRequired,
}

export default connect(null, {approveUser})(UserItem)
