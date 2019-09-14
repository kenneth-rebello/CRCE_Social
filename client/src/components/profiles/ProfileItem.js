import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const ProfileItem = ({profile, isAuth}) => {

    const {user, position, location} = profile;
    const {_id, name, avatar, branch, year} = user;

    return (
        <Fragment>
            <div className="profile">
                <div className="round">
                    <img src={avatar} alt=""/>
                </div>              
                <div className="profile-details">
                    <h2>{name}</h2>
                    <p>{position}</p>
                    <p>{year} - {branch}</p>
                    <p className="my-1">{location && <span>{location}</span>}</p>
                    {isAuth && <Link to={`/profile/${_id}`} className="btn btn-brick">View Profile</Link>}
                </div>
            </div>
        </Fragment>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{})(ProfileItem)
