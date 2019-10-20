import React from 'react'
import PropTypes from 'prop-types'

const ProfilePhoto = ({picture}) => {
    return (
        <div>
            <img className="item-img" src={require(`../../../public/profile-pictures/${picture}`)} alt=""/>
        </div>
    )
}

ProfilePhoto.propTypes = {

}

export default ProfilePhoto
