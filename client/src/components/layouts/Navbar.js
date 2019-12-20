import React, { Fragment, useState, useEffect } from 'react';
import './styles/nav.css'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Alert from './Alert'
import UserBox from '../dashboard/UserBox';
import { getUnseenNotifs } from '../../actions/notif';

const Navbar = (props) => {

    const {getUnseenNotifs} = props;

    useEffect(() => {
        getUnseenNotifs();
    },[getUnseenNotifs])

    const [displayNav, toggleNav] = useState(false)

    const authLinks = (
        <Fragment>
        <nav className="navbar">
            <div className="nav-wrapper">
                <Link to="/" className="title brand-logo">Edu-Social</Link>
                <Link to="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                <ul className="right hide-on-med-and-down nav-links">
                    {props.auth && !props.auth.loading && props.auth.user && <li><Link to={`/profile/${props.auth.user._id}`}>{props.auth.user.name}</Link></li>}
                    {props.notif && props.notif.unseen  && <li><Link to="/notifs"><i className="fa fa-bell"> {props.notif.unseen.length}</i></Link></li>}
                    <li><button type="button" className="btn btn-dark" onClick={()=>toggleNav(!displayNav)}><i className="fa fa-caret-down"></i></button></li>
                </ul>
            </div>
            {displayNav&& <div className="nav-extension">
                <ul>
                    <li><button onClick={()=>toggleNav(!displayNav)}><Link to="/chat">Chat</Link></button></li>
                    <li><button onClick={()=>toggleNav(!displayNav)}><Link to="/profiles">Profiles</Link></button></li>
                    <li><button onClick={()=>toggleNav(!displayNav)}><Link to="/posts">Posts</Link></button></li>
                    <li><button onClick={()=>toggleNav(!displayNav)}><Link to="/events">Events</Link></button></li>
                    <li><button onClick={()=>toggleNav(!displayNav)}><Link to="#!" onClick={ e => props.logout()}>Logout</Link></button></li>
                </ul>
            </div>}
            <div className="nav-goldline"></div>
            {props.alert.length>0 && (<div className="alerts">
                <Alert/>
            </div>)} 
        </nav>

        <ul className="sidenav sidenavbar-own" id="mobile-demo">
            <UserBox/>
            <li><Link to="/dashboard">Home</Link></li>
            {props.auth && !props.auth.loading && props.auth.user && <li><Link to={`/profile/${props.auth.user._id}`}>{props.auth.user.name}</Link></li>}
            {props.notif && props.notif.unseen &&  <li><Link to="/notifs">Notifications {props.notif.unseen.length}</Link></li>}
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
                <Link to="/" className="title brand-logo">Edu-Social</Link>
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

        <ul className="sidenav sidenavbar-own" id="mobile-demo">
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
    getUnseenNotifs: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    alert: PropTypes.array,
    auth: PropTypes.object.isRequired,
    notif: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    isAuth: state.auth.isAuthenticated,
    alert: state.alert,
    auth: state.auth,
    notif: state.notif
});

export default connect(mapStateToProps, { logout, getUnseenNotifs })(Navbar);