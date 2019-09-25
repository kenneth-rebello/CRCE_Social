import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileAbout = ({ profile }) => {

    let { bio, skills, user } = profile;
    let {_id, name} = user;

    return (
        <div className="profile-about">
            { bio && (<div className="bio">
                <h2 className="heading">About {name.trim().split(' ')[0]}</h2>
                <p>{bio}</p>
                {/* <div className="line"></div> */}
            </div>)}
            <h2 className="heading">
                {name.trim().split(' ')[0]}s Skill Set {`  `}
                <i className="fa fa-code"></i>{`  `}
                <button className="btn btn-light" style={{display:'inline', float:'right'}}><Link to={`/add_skill/${_id}`}><i className="fa fa-plus"></i></Link></button>
            </h2>
            <ul className="skills">
                {skills.map((skill, index) => (
                    (<li key={index}>
                        {skill}{` | `}
                    </li>)    
                ))}
            </ul>
        </div>
    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout
