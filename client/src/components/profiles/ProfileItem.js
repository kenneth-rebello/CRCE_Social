import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

const ProfileItem = ({profile}) => {

    const {user, position, location, contact, skills, dateOfBirth, dept, batch, bio} = profile;
    const {_id, name, avatar} = user;

    return (
        <Fragment>
            <div className="profile">
                <div className="round">
                    <img src={avatar} alt=""/>
                </div>              
                <div className="profile-details">
                    <h2>{name}</h2>
                    <p>{position}</p>
                    <p className="my-1">{location && <span>{location}</span>}</p>
                    <p>{batch} {dept}</p>
                    <Link to={`/profile/${_id}`} className="btn btn-brick">View Profile</Link>
                </div>
            </div>
        </Fragment>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
