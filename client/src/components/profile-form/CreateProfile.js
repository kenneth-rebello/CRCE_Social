import React, {Fragment, useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile} from '../../actions/profile'

const CreateProfile = props => {

    useEffect(() => {
        document.title = 'Create A Profile - CRCE Social'
    },[])
    
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const [formData, setFormData] = useState({
        dateOfBirth:'',
        contact:'',
        dept:'',
        batch:'',
        location:'',
        skills:'',
        position:'',
        github:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    })

    let { contact, dateOfBirth, location, skills, position, 
        github, bio,twitter,facebook,youtube,instagram, linkedin} = formData;

    const Changer = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const Submitter = e =>{
        e.preventDefault();
        props.createProfile(formData, props.history);
    }
    
    return (
        <Fragment>
            
            <h1 className="heading">
            Create Your Profile
            </h1>
            <p className="lead">
                Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e)=>Submitter(e)}>
                <div className="form-group">
                <select name="position" className=" browser-default own-default" value={position} onChange={(e)=>Changer(e)}>
                    <option value="" disabled>* Select Position</option>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Other Staff">Other Staff</option>
                    <option value="Placement Officer">Placement Officer</option>
                    <option value="Recruiter">Recruiter</option>
                </select>
                </div>
                <div className="form-group">
                <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={(e)=>Changer(e)}></input>
                <small className="form-text">Enter your date of birth</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Contact Number" name="contact" value={contact} onChange={(e)=>Changer(e)}></input>
                <small className="form-text">Enter a number other users can use to contact you</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>Changer(e)}></input>
                <small className="form-text">City & State suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e)=>Changer(e)}></input>
                <small className="form-text">Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e)=>Changer(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="form-group">
                <button onClick={() => toggleSocialInputs(!displaySocialInputs)}type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span style={{display:"block"}}>Optional</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className="form-group">
                    <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e)=>Changer(e)}></input>
                    </div>

                    <div className="form-group">
                    <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e)=>Changer(e)}></input>
                    </div>

                    <div className="form-group">
                    <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e)=>Changer(e)}></input>
                    </div>

                    <div className="form-group">
                    <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e)=>Changer(e)}></input>
                    </div>

                    <div className="form-group">
                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e)=>Changer(e)}></input>
                    </div>

                    <div className="form-group">
                    <input type="text" placeholder="Github URL" name="github" value={github} onChange={(e)=>Changer(e)}></input>
                    </div>
                </Fragment>}
                

                <input type="submit" value="Save" className="btn btn-primary" />
                <button className="btn btn-light"><Link  to="/dashboard">Go Back</Link></button> 
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

export default connect(null, {createProfile})(withRouter(CreateProfile))
