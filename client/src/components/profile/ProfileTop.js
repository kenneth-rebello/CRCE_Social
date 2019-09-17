import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile }) => {

    let {position, location, social, user,picture} = profile;
    let { name, avatar, year, branch } = user;

    return (
        <div className="profile-top bg-primary p-2">
            { picture && <img className="round-img" src={require(`../../../public/profile-pictures/${picture}`)} alt=""/>}
            <h1 className="heading">{name}</h1>
            <p>{year} - {branch}</p>
            <p>{location}</p>
        </div>
    )
}

ProfileTop.propTypes = {

}

export default ProfileTop