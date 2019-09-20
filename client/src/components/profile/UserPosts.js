import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm'

const UserPosts = ({auth, post, profile:{profile}}) => {

    let{user} = profile;
    return (
        <Fragment> 
        <div className="user-posts">
            <h1 className="heading">Posts By {user.name.trim().split(' ')[0]}</h1>
            <div className="posts">
                {post.posts.length<=0 && <h1 className="heading">No Posts To Show</h1>}
                {post.posts.length<=0 && auth.user._id == user._id && <PostForm/>}
                {!post.loading && post.posts.map(postitem => (
                    <PostItem key={postitem._id} post={postitem}/>
                ))}
            </div>
        </div>
        </Fragment>
    )
}

UserPosts.propTypes = {
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile,
    auth: state.auth
})


export default connect(mapStateToProps, {})(UserPosts)
