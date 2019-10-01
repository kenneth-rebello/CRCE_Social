import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getPendingPosts} from '../../actions/post';
import { getPendingUsers } from '../../actions/admin';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import ProfileItem from '../profiles/ProfileItem';

const AdminDash = ({getPendingPosts, getPendingUsers, auth, profile, pending, post}) => {

    useEffect(() => {
        getPendingPosts();
        getPendingUsers()
    }, [getPendingPosts, getPendingUsers]);

    
    return (
        (profile.loading && auth.loading && pending.loading && post.loading) && profile.profile === null ? <Spinner /> :

        <Fragment>
            <div className="admindash">
                <div className="admindash-half">

                    <Fragment>
                        <h1 className="heading">Posts pending for approval</h1>
                        <div className="posts">
                            {pending.posts.map(post => (
                                <PostItem key={post._id} post={post}/>
                            ))}
                        </div>
                    </Fragment>
                </div>
                <div className="admindash-half">
                   <Fragment>
                        <h1 className="heading">Users awaiting approval</h1>
                        <div className="users">  
                            {pending.users.map(profile => (
                                <ProfileItem key={profile._id} profile={profile}/>
                            ))}
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

AdminDash.propTypes = {
    getPendingPosts: PropTypes.func.isRequired,
    getPendingUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    pending: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post,
    pending: state.pending
});

export default connect(mapStateToProps, {getPendingPosts, getPendingUsers})(AdminDash)
