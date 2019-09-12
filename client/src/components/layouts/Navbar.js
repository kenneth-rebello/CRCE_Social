import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Alert from './Alert'

const Navbar = (props) => {

    const authLinks = (
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profiles">Profiles</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link onClick={props.logout} to="#!">Logout</Link></li>
        </ul>

    );

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Profiles</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>
    );

    return (
        <div className="nav">
            <nav className="navbar">
                <div>
                    <h1><Link to="/" className="title">CRCE Social</Link></h1>
                </div>
                <div>
                    { props.isAuth ? authLinks : guestLinks}
                </div>
            </nav>
            <div className="underline"></div>
             {props.alert.length>0 && (<div className="alerts">
                <Alert/>
            </div>)} 
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    alert: PropTypes.object,
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
    alert: state.alert
});

export default connect(mapStateToProps, { logout })(Navbar);