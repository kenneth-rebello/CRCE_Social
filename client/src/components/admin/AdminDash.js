import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import {getPosts, getPendingPosts} from '../../actions/post';
import { getPendingUsers } from '../../actions/admin';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';
import UserItem from '../profiles/UserItem';

const AdminDash = ({getCurrentProfile, getPendingPosts, getPendingUsers, getPosts, auth, profile, pending, post}) => {

    useEffect(() => {
        getCurrentProfile();
        getPosts();
        getPendingPosts();
        getPendingUsers()
    }, [getCurrentProfile, getPendingPosts, getPosts, getPendingUsers]);

    const [displayPendingPosts, togglePendingPosts] = useState(false);
    const [displayPendingUsers, togglePendingUsers] = useState(false);
    
    return (
        (profile.loading || auth.loading || pending.loading || post.loading) && profile.profile === null ? <Spinner /> :

        <Fragment>
            <div className="admindash">
                <div className="admindash-half">

                    {displayPendingPosts && (<Fragment>
                        <h1 className="heading">Posts pending for approval</h1>
                        <div className="posts">
                            {pending.posts.map(post => (
                                <PostItem key={post._id} post={post}/>
                            ))}
                        </div>
                    </Fragment>)}
                    {displayPendingUsers && (<Fragment>
                        <h1 className="heading">Users awaiting approval</h1>
                        <div className="users">  
                            {pending.users.map(user => (
                                <UserItem key={user._id} user={user}/>
                            ))}
                        </div>
                    </Fragment>)
                    }

                    {post.loading? (<Spinner/>):
                    <div className="posts">
                        <PostForm />
                        {post.posts.map(post => (
                            <PostItem key={post._id} post={post}/>
                        ))}
                    </div>}
                </div>
                <div className="user-admin">
                    <h1>Welcome</h1>
                    <h1 className="heading">{auth.user && auth.user.name }</h1>
                    {profile.profile !== null?
                        (<Fragment className="user-switch">
                            {auth.user && <Link to={`/profile/${auth.user._id}`} className="dash-link">View Profile</Link>}
                            <img src={profile.profile.photo} alt=""/>
                        </Fragment>) :
                        (<Fragment className="user-switch">
                            <p>You have not yet set up a profile, please add some information about yourself</p>
                            <Link to="/create_profile" className="dash-link">Create Profile</Link>
                        </Fragment>)
                    }
                    {auth.user && auth.user.admin && <div className="admin-buttons">
                        <button className="btn btn-light" onClick={() => togglePendingPosts(!displayPendingPosts)}>Show Pending Posts</button>
                        <button className="btn btn-light" onClick={() => togglePendingUsers(!displayPendingUsers)}>Show Pending Users</button>
                    </div>}         
                </div>
            </div>
        </Fragment>
    )
}

AdminDash.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    getPendingPosts: PropTypes.func.isRequired,
    getPendingUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post,
    pending: state.pending
});

export default connect(mapStateToProps, {getPosts, getCurrentProfile, getPendingPosts, getPendingUsers})(AdminDash)
