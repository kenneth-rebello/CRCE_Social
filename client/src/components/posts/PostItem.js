import React ,{Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import {addLike, removeLike} from '../../actions/post';

const PostItem = ({auth, post, addLike, removeLike}) => {

    let { _id, text, name, avatar, user, likes, comments, date } = post;

    return (
        <Fragment>
        {post? 
        (<Fragment>
            <div className="post">
                <div className="post-user">
                    <Link to={`/profile/{user._id}`}>
                    <div><img className="round-img" src={avatar} alt=""/></div>
                    <h1 className="heading">{name}</h1>
                    </Link>
                </div>
        
                <div className="post-data">
                    <p className="post-text">{text}</p>
                    <p className="post-date">
                        Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
                    </p>
                    <div>
                        { likes.filter(like => like.user === auth.user._id).length>0 ? (
                            <button type="button" className="btn btn-red" onClick={() => removeLike(_id)}>
                            <span>Unlike</span>{` `}
                            </button>
                        ):(
                            <button type="button" className="btn btn-green" onClick={() => addLike(_id)}>
                            <span>Like</span>{ ` `}
                            </button>)
                        }
                        <span className="likes">{likes.length} Likes</span>
                        <Link to={`/post/${_id}`}className="btn btn-primary">
                        Discussion <span className='comment-count'>{comments.length}</span>
                        </Link>
                        {!auth.loading && user === auth.user._id &&
                            <button type="button" className="btn btn-red" style={{float:'right'}}>
                            Delete
                            </button>
                        }
                    </div>
                </div>
            </div>
        </Fragment>) :
        (<Fragment>
            <Spinner/>
        </Fragment>)}
        </Fragment>
    )
}

PostItem.propTypes = {
    post:PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addLike, removeLike})(PostItem)
