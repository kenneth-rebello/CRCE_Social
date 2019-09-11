import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import {getAllProfiles} from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({getAllProfiles, profile}) => {

    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    return (
        <Fragment>
            {profile.loading ? <Spinner/> : <Fragment>
                <h1 className="large text-primary">Users</h1>
                <p className="lead">Check out the users of our page</p>

                <div className="profiles">
                    {profile.profiles.length>0 ? (
                        profile.profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    ) : <h4>No Profiles To Show</h4>}
                </div>
            </Fragment>}
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
