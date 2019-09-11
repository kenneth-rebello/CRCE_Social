import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


const Landing = ({isAuth}) => {
    if(isAuth){
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="page">
            <div className="landing-box">
                <span className="title">CRCE Hub</span>
                <p>
                    Create a profile, share posts and get help from
                    other students
                </p>
                <Link to="/register">Join CRCE Social today! Click here to register</Link>
            </div>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
