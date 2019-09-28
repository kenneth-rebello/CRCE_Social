import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Alert from './Alert'

const Navbar = (props) => {

    

    const authLinks = (
        <Fragment>
        <nav className="navbar">
            <div className="nav-wrapper">
                <Link to="/" className="title brand-logo">CRCE Social</Link>
                <Link to="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                <ul className="right hide-on-med-and-down nav-links">
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/chat">Chat</Link></li>
                <li><Link to="/profiles">Profiles</Link></li>
                <li><Link to="/posts">Posts</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="#!" onClick={ e => props.logout()}>Logout</Link></li>
                </ul>
            </div>
            <div className="nav-goldline"></div>
            {props.alert.length>0 && (<div className="alerts">
                <Alert/>
            </div>)} 
        </nav>

        <ul className="sidenav sidenavbar-own" id="mobile-demo">
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/profiles">Profiles</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="#!" onClick={ e => props.logout()}>Logout</Link></li>
        </ul>

        </Fragment>
    );

    const guestLinks = (
        <Fragment>
        <nav className="navbar">
            <div className="nav-wrapper">
                <Link to="/" className="title brand-logo">CRCE Social</Link>
                <Link to="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                <ul className="right hide-on-med-and-down nav-links">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </div>
            <div className="nav-goldline"></div>
            {props.alert.length>0 && (<div className="alerts">
                <Alert/>
            </div>)}     
        </nav>

        <ul className="sidenavbar-own sidenav" id="mobile-demo">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>

        </Fragment>
    );

    return (
        <Fragment>
            { props.isAuth ? authLinks : guestLinks}
            <button id="goToTop"><i className="fa fa-arrow-up"></i></button>
        </Fragment>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    alert: PropTypes.array,
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
    alert: state.alert,
});

export default connect(mapStateToProps, { logout })(Navbar);