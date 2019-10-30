import React from 'react'

const ProfilePhoto = ({picture}) => {
    return (
        <div>
            <img className="item-img" src={require(`../../../public/profile-pictures/${picture}`)} alt=""/>
        </div>
    )
}


export default ProfilePhoto