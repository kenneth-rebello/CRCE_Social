import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = (props) => {

    const authLinks = (
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profiles">Profiles</Link></li>
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
        <nav className="navbar">
            <div>
                <h1><Link to="/" className="title">CRCE Hub</Link></h1>
            </div>
            <div>
                { props.isAuth ? authLinks : guestLinks}
            </div>
            <label className="underline">.</label>
            <label className="underline">.</label>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);