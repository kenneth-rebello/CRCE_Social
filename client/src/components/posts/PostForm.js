import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const PostForm = ({addPost}) => {

    const [text, setText] = useState('')

    const Submitter = e => {
        e.preventDefault();
        addPost({text});
        setText('');
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h1>Say Something</h1>
            </div>
            <form className="form" onSubmit={e => Submitter(e)}>
                <textarea
                name="text" 
                cols="90"
                rows="8"
                placeholder="Create a post"
                value={text}
                onChange={e => setText(e.target.value)}
                required></textarea><br/>
                <input type="submit" className="btn btn-dark" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)
