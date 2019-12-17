import React from 'react'

const ProfilePhoto = ({picture}) => {
    return (
        <div>
            <img className="item-img" src={`image/${picture}`} alt=""/>
        </div>
    )
}


export default ProfilePhoto