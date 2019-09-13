import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PostItem from '../posts/PostItem';

const UserPosts = ({post, profile:{profile}}) => {

    let{user} = profile;
    return (
        <Fragment> 
        <div className="user-posts">
            <h1 className="heading">Posts By {user.name.trim().split(' ')[0]}</h1>
            <div className="posts">
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
}

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile
})


export default connect(mapStateToProps, {})(UserPosts)
