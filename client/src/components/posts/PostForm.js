import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const PostForm = ({addPost}) => {

    const [form, setForm] = useState({
        text: '',
        url: ''
    });
    const [displayAddImage, toggleAddImage] = useState(false)

    const Changer = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const Submitter = e => {
        e.preventDefault();
        addPost(form);
        setForm({
            text:'',
            url:''
        });
    }

    const {text, url} = form;

    return (
        <div className="post-form">
            <div>
                <h1 className="heading">Say Something</h1>
            </div>
            <form className="form" onSubmit={e => Submitter(e)}>
                <textarea
                    name="text"
                    type="text" 
                    cols="90"
                    rows="10"
                    value={text}
                    placeholder="Create a post"
                    onChange={e => Changer(e)}
                    required
                />
                <br/>
                {!displayAddImage && <button className="btn btn-light" onClick={() => toggleAddImage(!displayAddImage)}>Add Image</button>}

                {displayAddImage && <div className="button-grid">
                    <button className="btn btn-light" onClick={() => toggleAddImage(!displayAddImage)}>
                        <i className="fa fa-window-close"></i>
                    </button>
                    <input name="url" type="text" value={url} onChange ={e => Changer(e)}/>
                </div>}

                <input type="submit" className="btn btn-dark" value="Post" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)
