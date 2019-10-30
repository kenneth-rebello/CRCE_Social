import React ,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {getFollowing} from '../../actions/profile';
import {connect} from 'react-redux'
import ProfileItem from '../profiles/ProfileItem';
import Spinner from '../layouts/Spinner';

const Following = ({profile, getFollowing, match}) => {

    useEffect(() => {
        getFollowing(match.params.id)
    },[getFollowing])

    return (
        <Fragment>
            {!profile.loading && profile.profiles ? (<div className="all-profiles">
                <h1 className="heading">All Users</h1>
                <div className="profiles">
                    {profile.profiles.length<=0 || !profile ? 
                    (<h4 style={{fontSize:"60px", textAlign:'center'}}>No Profiles To Show</h4>) :
                    (
                        profile.profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    )}
                </div>
            </div>): <Spinner/> }
        </Fragment>
    )
}

Following.propTypes = {
    getFollowing: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getFollowing})(Following)
