import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {approveUser, rejectUser} from '../../actions/admin'
import ProfilePhoto from './ProfilePhoto';

const ProfileItem = ({auth, profile, isAuth, approveUser, rejectUser}) => {

    const {user, position, location, picture} = profile;
    const {_id, name, approved, branch, year} = user;
    
    return (
        <Fragment>
            <div className="profile">
                <div>
                    {picture && <ProfilePhoto picture={picture}/>}
                </div>              
                <div className="profile-details">
                    <h1>{name}</h1>
                    <div className="line">
                        <p>{position}</p>
                        <p>{year} - {branch}</p>
                        <p className="my-1">{location && <span>{location}</span>}</p>
                    </div>
                    {isAuth && auth.user && auth.user.approved &&<Link to={`/profile/${_id}`} >View Profile</Link>}
                    {auth && auth.user && auth.user.admin && !approved &&
                        <div className="profile-buttons">
                            <button className="btn btn-green" onClick={() => approveUser(_id)}>
                                Approve
                            </button>
                            <button className="btn btn-red" onClick={()=> rejectUser(profile._id)}>
                                Reject
                            </button>
                        </div>}
                </div>
            </div>
        </Fragment>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
    rejectUser: PropTypes.func.isRequired,
    approveUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated,
    auth: state.auth,
})

export default connect(mapStateToProps,{ approveUser, rejectUser })(ProfileItem)
