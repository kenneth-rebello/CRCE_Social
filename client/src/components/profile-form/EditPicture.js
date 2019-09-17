import React, {useState, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {editPicture} from '../../actions/profile'

const EditPicture = ({editPicture, history}) => {

    const [fileData, setFileData] = useState('');
    const [fileName, setFileName] = useState('');

    const Changer = e => {
        setFileData(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const Submitter = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file",fileData)
        editPicture(formData,history);
    }

    return (
        <Fragment>
            <div className="profile-forms">
                <h1 className="heading">
                    Edit Your Profile Picture
                </h1>
                <form className="form" onSubmit={e => Submitter(e)}>
                    <div className="form-group">
                        <input name="profile "type="file"className="btn btn-light" onChange ={e =>Changer(e)}/>
                    </div>

                    <input type="submit" value="Add" className="btn btn-dark"></input>
                
                    <button className="btn btn-light"><Link to="/profile/me">Go Back</Link></button>
                </form>
            </div>
        </Fragment>
    )
}

EditPicture.propTypes = {
    editPicture: PropTypes.func.isRequired,
}

export default connect(null, {editPicture})(withRouter(EditPicture))
