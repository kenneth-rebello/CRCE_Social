import React ,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile} from '../../actions/profile';
import {delAccount} from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';


const Dashboard = ({getCurrentProfile, delAccount, auth, profile}) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);


    
    return (
        profile.loading && profile.profile === null ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">Welcome {auth.user && auth.user.name }</p>
            {profile.profile !== null
            ?
            <Fragment>
                <DashboardActions/>
                <Education education={profile.profile.education}/>
            </Fragment>
            : 
            <Fragment>
                <p>You have not yet set up a profile, please add some information about yourself</p>
                <Link to="/create_profile" className="btn btn-primary">Create Profile</Link>
            </Fragment>}
        </Fragment>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    delAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});
       
export default connect(mapStateToProps, {getCurrentProfile, delAccount})(Dashboard);