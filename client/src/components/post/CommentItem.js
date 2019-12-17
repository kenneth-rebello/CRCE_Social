import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {deleteComment} from '../../actions/post'

const CommentItem = ({auth, postId, comment, deleteComment}) => {

    let {_id, text, name, picture, user, date} = comment;

    return (
        <Fragment>
            <div className="comment-item">
                <div className="comment-header">
                    <div>
                        {picture && <img className="comment-img" src={`image/${picture}`} alt=""/>}
                    </div>                  
                    <div>
                        <h4>{name}</h4>
                    </div> 
                </div>
                <p className="comment">{text}</p>
                <div className="comment-footer">
                    <p className="comment-date">
                        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                    </p>
                    {!auth.loading && user === auth.user._id && 
                        <button onClick={e => deleteComment(postId, _id)} type="button" className="btn btn-red">
                            <i className="fa fa-trash"></i>
                        </button>}
                </div>
            </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)