import React from 'react'
import './profiles.css'

const ProfilePhoto = ({picture}) => {
    return (
        <div className="item-img">
            <img  src={`image/${picture}`} alt=""/>
        </div>
    )
}


export default ProfilePhoto