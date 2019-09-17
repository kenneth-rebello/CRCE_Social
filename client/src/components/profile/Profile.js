import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import UserPosts from './UserPosts';
import Education from './Education';
import Status from './Status';
import { getProfileById, delAccount } from '../../actions/profile';
import { getUserPosts } from '../../actions/post';


const Profile = ({ getProfileById, getUserPosts, delAccount, profile, auth, match }) => {
    
    const [displayEducation, toggleEducation] = useState(false);
    const [displayStatus, toggleStatus] = useState(false);

    useEffect(() => {
        getUserPosts(match.params.id);
        getProfileById(match.params.id);
    },[])
    
    return (
        <Fragment>
            {profile.profile === null || profile.loading ? <Spinner/> : <Fragment>
                <div className="profile-grid">
                    <ProfileTop profile={profile.profile}/>
                    <div className="profile-buttons">
                        <button className="btn btn-light"><Link to="/profiles">Go Back</Link></button>
                        {auth.isAuthenticated && auth.loading === false && (auth.user._id === profile.profile.user._id || auth.user.admin)  && 
                        (<Fragment>
                            <button className="btn btn-dark"><Link to="/edit_profile">Edit Profile</Link></button>
                            <button className="btn btn-red" onClick={() => delAccount()}>Delete Account</button>
                        </Fragment>)}
                        {auth.isAuthenticated && auth.loading === false && auth.user._id !== profile.profile.user._id &&
                        (<Fragment>
                            <button className="btn btn-gold">Follow</button>
                        </Fragment>)}
                    </div>
                    <ProfileAbout profile={profile.profile}/>
                    <h2 className="heading">Educational Qualifications<button className="btn btn-light btn-icon" onClick={() => toggleEducation(!displayEducation)} style={{display:'inline'}}>
                    <i class="fas fa-angle-down"></i>
                        </button></h2>
                    
                    {displayEducation && <Education education = {profile.profile.education}/>}
                    <h2 className="heading">Academic Status<button className="btn btn-light btn-icon" onClick={() => toggleStatus(!displayStatus)} style={{display:'inline'}}>
                    <i class="fas fa-angle-down"></i>
                        </button></h2>

                    {displayStatus && <Status status = {profile.profile.status}/>}
                    {auth.user && <UserPosts/>}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    getUserPosts: PropTypes.func.isRequired,
    delAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect (mapStateToProps, { getUserPosts, getProfileById, delAccount })(Profile)