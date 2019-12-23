import React, { Fragment } from 'react';
import './dashboard.css';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const UserBox = ({auth, profile, post}) => {
    return (
        profile.loading && profile.profile === null ? <Spinner /> :
        <div>
            {!auth.loading && <div className="user">
                <h1 className="heading">{auth.user && auth.user.name }</h1>
                {auth && !profile.loading && profile.profile !== null?
                    (<Fragment>
                        {auth.user && <Link to={`/profile/${auth.user._id}`} className="dash-link">View Profile</Link>}
                        <div className="dash-img">
                            {profile.profile.picture && <img src={`/image/${profile.profile.picture}`} alt={`${auth.user.name}`}/>}
                        </div>
                        {!profile.loading && profile.profile.position === 'Placement Officer' && <button className="btn btn-light dash-btn"><Link to="/po_form">Eligibility List</Link></button>}
                        {!profile.loading && profile.profile.position === 'Faculty' && <button className="btn btn-light dash-btn"><Link to="/add_event">Add Event</Link></button>}
                        {!auth.loading && auth.user && auth.user.admin && <button className="btn btn-light dash-btn"><Link to="/admindash">Admin Dashboard</Link></button>}
                    </Fragment>) :
                    (<Fragment className="user-switch">
                        <Link to="/create_profile" className="dash-link">Create Profile</Link>
                        <p style={{padding:'5px'}}>You have not yet set up a profile, please add some information about yourself to get approved by an admin</p>
                    </Fragment>)
                }
            </div>}    
        </div>
    )
}

UserBox.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post
});
       
export default connect(mapStateToProps, null)(UserBox);