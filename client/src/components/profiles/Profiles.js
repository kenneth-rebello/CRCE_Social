import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import {getAllProfiles} from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({getAllProfiles, profile}) => {

    useEffect(() => {
        document.title = 'All Profiles - CRCE Social'
    },[])

    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    return (
        <Fragment>
            {profile.loading ? <Spinner/> : (<div className="all-profiles">
                <h1 className="heading">All Users</h1>
                <div className="profiles">
                    {profile.profiles.length<=0 || !profile ? 
                    (<h4 style={{fontSize:"60px", textAlign:'center'}}>No Profiles To Show</h4>) :
                    (
                        profile.profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    )}
                </div>
            </div>)}
        </Fragment>
    )
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getAllProfiles})(Profiles)
