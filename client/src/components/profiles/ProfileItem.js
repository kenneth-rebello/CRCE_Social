import React ,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {approveUser, rejectUser} from '../../actions/admin'

const ProfileItem = ({auth, profile, isAuth, approveUser, rejectUser}) => {

    const {user, position, location, picture} = profile;
    const {_id, name, approved, branch, year} = user;

    return (
        <Fragment>
            <div className="profile">
                <div>
                    {picture && <img className="item-img" src={require(`../../../public/profile-pictures/${picture}`)} alt=""/>}
                </div>              
                <div className="profile-details">
                    <h2>{name}</h2>
                    <p>{position}</p>
                    <p>{year} - {branch}</p>
                    <p className="my-1">{location && <span>{location}</span>}</p>
                    {isAuth && <Link to={`/profile/${_id}`} className="btn btn-brick">View Profile</Link>}
                    {auth && auth.user.admin && !approved &&
                        <Fragment>
                            <button className="btn btn-green" onClick={() => approveUser(_id)}>
                                Approve
                            </button>
                            <button className="btn btn-red" onClick={()=> rejectUser(profile._id)}>
                                Reject
                            </button>
                        </Fragment>}
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
