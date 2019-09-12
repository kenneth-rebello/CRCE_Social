import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile, auth, match }) => {
    
    useEffect(() => {
        getProfileById(match.params.id);
    })
    
    return (
        <Fragment>
            <div className="plain-page">
            {profile.profile === null || profile.loading ? <Spinner/> : <Fragment>
                <div className="profile-grid">
                    <ProfileTop profile={profile.profile}/>
                    <div className="profile-buttons">
                        <button className="btn btn-light"><Link to="/profiles">Go Back</Link></button>
                        {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.profile.user._id && 
                        (<button className="btn btn-dark"><Link to="/edit_profile">Edit Profile</Link></button>)}
                    </div>
                    <ProfileAbout profile={profile.profile}/>
                </div>
            </Fragment>}
            </div>
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect (mapStateToProps, { getProfileById })(Profile)
