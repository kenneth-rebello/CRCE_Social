import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const PostForm = ({addPost}) => {

    const [text, setText] = useState('');
    const [fileData, setFileData] = useState('');
    const [fileName, setFileName] = useState('');

    const Changer = e => {
        setFileData(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const Submitter = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file",fileData);
        formData.append("text",text);
        addPost(formData);
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
                type="text" 
                cols="90"
                rows="8"
                placeholder="Create a post"
                value={text}
                onChange={e => setText(e.target.value)}
                required></textarea><br/>
                <input name="upload" type="file" className="btn btn-light" onChange ={e =>Changer(e)}/>
                <input type="submit" className="btn btn-dark" value="Submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)
