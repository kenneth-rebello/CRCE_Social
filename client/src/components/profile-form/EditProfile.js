import React, {Fragment, useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile, getCurrentProfile} from '../../actions/profile'

const EditProfile = ({profile: {profile, loading}, createProfile, getCurrentProfile, history}) => {
    
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const [formData, setFormData] = useState({
        dateOfBirth:'',
        contact:'',
        dept:'',
        batch:'',
        location:'',
        skills:'',
        position:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    });

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            contact: loading || !profile.contact ? '' : profile.contact,
            location: loading || !profile.location ? '' : profile.location,
            position: loading || !profile.position? '' : profile.position,
            dateOfBirth: loading || !profile.dateOfBirth? '' : profile.dateOfBirth,
            bio: loading || !profile.bio ? '' : profile.bio,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername
        });
    }, [loading]);

    let { contact, dateOfBirth, location, achievements, position, 
        githubusername, bio,twitter,facebook,youtube,instagram, linkedin} = formData;

    const Changer = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const Submitter = e =>{
        e.preventDefault();
        console.log(history);
        createProfile(formData, history, true);
    }
    
    return (
        <Fragment>
        <div className="main-form">
            <div className="profile-forms">
                <h1 className="heading">
                Edit Your Profile
                </h1>
                <small>* = required field</small>
                <form className="form" onSubmit={(e)=>Submitter(e)}>
                    <div className="form-group">
                    <select name="position" value={position} onChange={(e)=>Changer(e)}>
                        <option value="">* Select Position</option>
                        <option value="Student">Student</option>
                        <option value="Assistant Teacher">Assistant Teacher</option>
                        <option value="Teacher">Teacher</option>
                        <option value="HeadOfDepartment">Head Of Department</option>
                        <option value="Placement Officer">Placement Officer</option>
                        <option value="Lab Asistant">Lab Asistant</option>
                        <option value="Trainee">Trainee</option>
                        <option value="Other">Other</option>
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
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername} onChange={(e)=>Changer(e)}
                    ></input>
                    <small className="form-text"
                        >If you want your latest repos and a Github link, include your
                        username</small>
                    </div>
                    <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e)=>Changer(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="form-group">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Edit Social Network Links
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
                    </Fragment>}
                    

                    <input type="submit" value="Done" className="btn btn-dark"></input>
                    <button type="button" className="btn btn-light"><Link to="/dashboard">Go Back</Link></button>
                </form>
            </div>
            <div className="edit-profile-actions">
                <button className="btn btn-light"><Link to="/profile_picture">Edit Profile Picture</Link></button>
                { position=="Student" && <button className="btn btn-light"><Link to="/add_skill">Add Skill</Link></button>}
                { position=="Student" && <button className="btn btn-light"><Link to="/add_education">Add Education</Link></button>}
                { position=="Student" && <button className="btn btn-light"><Link to="/add_status">Add Sem Marks</Link></button>}
            </div>
        </div>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile))
