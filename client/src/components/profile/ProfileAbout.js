import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layouts/Spinner'

const ProfileAbout = ({ profile, auth}) => {

    let { bio, skills, user } = profile;
    let {_id, name} = user;

    return (
        auth.loading ? <Spinner/> : <div className="profile-about">
            { bio && (<div className="bio">
                <h2 className="heading">About {name.trim().split(' ')[0]}</h2>
                <p>{bio}</p>
            </div>)}
            <div className='skill-set'>
                <h2 className="heading">
                    {name.trim().split(' ')[0]}s Skill Set {`  `}
                    <i className="fa fa-code"></i>{`  `}
                    {auth.user._id === _id && <button className="btn btn-light" style={{display:'inline', float:'right'}}><Link to={`/add_skill`}><i className="fa fa-plus"></i></Link></button>}
                </h2>
                <ul className="skills">
                    {skills.map((skill, index) => (
                        (<li key={index}>
                            {skill}{` | `}
                        </li>)    
                    ))}
                </ul>
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

export default ProfileAbout
