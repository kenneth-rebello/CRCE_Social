import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile }) => {

    let {position, location, social, user} = profile;
    let { name, avatar, year, branch } = user;

    return (
        <div className="profile-top bg-primary p-2">
            <img className="round" src={avatar} alt=""/>
            <h1 className="heading">{name}</h1>
            <p>{year} - {branch}</p>
            <p>{location}</p>
        </div>
    )
}

ProfileTop.propTypes = {

}

export default ProfileTop