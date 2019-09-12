import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile }) => {

    let { bio, skills, user } = profile;
    let {name} = user;

    return (
        <div className="profile-about">
            { bio && (<div className="bio">
                <h2 className="heading">About {name.trim().split(' ')[0]}</h2>
                <p>{bio}</p>
                {/* <div className="line"></div> */}
            </div>)}
            <h2 className="heading">Skill Set</h2>
            <ul className="skills">
                {skills.map((skill, index) => (
                    (<li key={index}>
                        {skill}
                    </li>)    
                ))}
            </ul>
        </div>
    )
}

ProfileAbout.propTypes = {

}

export default ProfileAbout
