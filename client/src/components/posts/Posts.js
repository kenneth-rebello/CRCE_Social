import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({getPosts, post, auth}) => {

    useEffect(() => {
        document.title="Posts - CRCE Social"
    },[])

    useEffect(() => {
        getPosts();
    },[getPosts]);

    return (
        <Fragment>
            { auth.user && auth.user.approved ? (<Fragment>
                {post.loading ? (<Spinner/>) : 
                <div className="posts-page">
                    <h1 className="heading">Posts</h1>
                    <p>Welcome to the community</p>
                    <PostForm />
                    <div className="posts">
                        {post.posts.map(post => (
                            <PostItem key={post._id} post={post}/>
                        ))}
                    </div>
                </div>}
            </Fragment>) : (<Fragment>
                <h1 className="heading">Sorry, you can not view posts until you are an approved member</h1>
            </Fragment>)
            }
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
 post: state.post,
 auth: state.auth
})


export default connect(mapStateToProps, {getPosts})(Posts)
