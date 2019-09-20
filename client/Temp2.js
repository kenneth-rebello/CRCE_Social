import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Alert from './Alert'

const Navbar = (props) => {

    const [displayNav, toggleDisplayNav] = useState(false)

    const authLinks = (
        <ul className="navbar-links">
            <li><Link to="/dashboard" onClick={() => toggleDisplayNav(!displayNav)}>Home</Link></li>
            <li><Link to="/profiles" onClick={() => toggleDisplayNav(!displayNav)}>Profiles</Link></li>
            <li><Link to="/posts" onClick={() => toggleDisplayNav(!displayNav)}>Posts</Link></li>
            <li><Link to="#!" onClick={ e => props.logout(e)}>Logout</Link></li>
        </ul>

    );

    const guestLinks = (
        <ul className="navbar-links">
            <li><Link to="/profiles" onClick={() => toggleDisplayNav(!displayNav)}>Profiles</Link></li>
            <li><Link to="/login" onClick={() => toggleDisplayNav(!displayNav)}>Login</Link></li>
            <li><Link to="/register" onClick={() => toggleDisplayNav(!displayNav)}>Register</Link></li>
        </ul>
    );

    return (
        <div className="nav">
            <nav className="navbar">
                <div>
                    <h1><Link to="/" className="title">CRCE Social</Link></h1>
                </div>
                <div>
                    <button className="btn btn-dark btn-icon" onClick={() => toggleDisplayNav(!displayNav)} style={{display:'inline'}}>
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                </div>
            </nav>
            {displayNav && <div className="nav-hidden">
                { props.isAuth ? authLinks : guestLinks}
            </div>}
            <div className="nav-line"></div>
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
    alert: PropTypes.array,
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
    alert: state.alert
});

export default connect(mapStateToProps, { logout })(Navbar);