import React, {useState, Fragment, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {editPicture, deletePicture, getProfileById} from '../../actions/profile'

const EditPicture = ({editPicture, deletePicture, getProfileById, history, profile, auth}) => {

    useEffect(() => {
        document.title = 'Edit Your Profile Picture - Edu-Social';
        !auth.loading && getProfileById(auth.user._id)
    },[getProfileById, auth])

    const [fileData, setFileData] = useState('');

    const Changer = e => {
        setFileData(e.target.files[0]);
    }

    const Submitter = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file",fileData)
        editPicture(formData,history);
    }

    const Deleter = () =>{
        deletePicture(history);
    }

    return (
        <Fragment>
            <div className="profile-forms">
                <h1 className="heading">
                    Edit Your Profile Picture
                </h1>
                <form className="form" onSubmit={e => Submitter(e)}>
                    <div className="form-group">
                        <input name="upload"type="file"className="btn btn-light" 
                            onChange ={e =>Changer(e)}
                            accept=".jpg, .jpeg, .bmp, .png, .gif"
                        />
                    </div>

                    <input type="submit" value="Add" className="btn btn-dark"></input>
                
                    <button className="btn btn-light"><Link to="/profile/me">Go Back</Link></button>
                    {!profile.loading && profile.profile.picture && <button className="btn btn-red" onClick={()=>Deleter()}>Delete</button>}
                </form>
            </div>
        </Fragment>
    )
}

EditPicture.propTypes = {
    editPicture: PropTypes.func.isRequired,
    deletePicture: PropTypes.func.isRequired,
    getProfileById: PropTypes.func.isRequired,
}

export const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {editPicture, deletePicture, getProfileById})(withRouter(EditPicture))
