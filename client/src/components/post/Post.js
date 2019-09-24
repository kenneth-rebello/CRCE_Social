import React ,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layouts/Spinner'
import {getPost, getPosts} from '../../actions/post'
import PostPage from './PostPage'
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({getPost, getPosts, post:{post, loading}, match}) => {

    useEffect(()=> {
        getPosts()
        getPost(match.params.id);
    },[getPost, getPosts])

    return (
        <div className="single-post">
            {loading || post===null ? <Spinner/> :
                <Fragment>
                    {!loading && <PostPage post={post}/>}
                    <CommentForm postId={post._id}/>
                    {!post.loading && post.comments && <div className="comments">
                        {post.comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} postId={post._id}></CommentItem>
                        ))}
                    </div>}
                </Fragment>
            }
        </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost, getPosts})(Post)
