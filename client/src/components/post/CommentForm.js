import React ,{useState}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../actions/post'

const CommentForm = ({postId, addComment}) => {

    const [text, setText] = useState('');

    const Submitter = e => {
        e.preventDefault();
        addComment(postId, {text});
        setText('');
    }

    return (
        <div className="comment-form">
            <div>
                <h1 className="heading">Leave A Comment</h1>
            </div>
            <form className="form" onSubmit={e => Submitter(e)}>
                <textarea
                name="text"
                type="text" 
                cols="90"
                rows="10"
                placeholder="Create a post"
                value={text}
                onChange={e => setText(e.target.value)}
                required></textarea><br/>
                <input type="submit" className="btn btn-dark" value="Send" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(CommentForm)
