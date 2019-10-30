import React, {useState, useEffect, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addSkill, removeSkill, getProfileById} from '../../actions/profile'

const AddSkill = ({auth, getProfileById, profile, addSkill, removeSkill}) => {

    useEffect(() => {
        document.title = 'Add/Remove A Skill - CRCE Social'
    },[])

    const [formData, setFormData] = useState({
        skill:''
    });

    useEffect(() => {
        !auth.loading && getProfileById(auth.user._id);
    },[getProfileById, auth])

    const {skill} = formData;

    const Changer = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const Submitter = e => {
        e.preventDefault();
        addSkill(formData);
    }

    return (
        <Fragment>
            <div className="profile-forms">
                <h1 className="heading">
                    Add A New Skill
                </h1>
                <form className="form" onSubmit={e => Submitter(e)}>
                    <div className="form-group">
                    <input
                        type="text"
                        placeholder="Add a new skill"
                        name="skill"
                        value={skill}
                        onChange = {e => Changer(e)}
                        required
                    ></input>
                    </div>

                    <input type="submit" value="Add" className="btn btn-dark"></input>
                
                    <button className="btn btn-light"><Link to="/dashboard">Go Back</Link></button>
                </form>
            </div>
            {!profile.loading && <div className="skill-list">
                <table>
                    {!profile.loading && profile.profile.skills.map((one) => (
                        <tr>
                            <td>{one}</td>
                            <td>
                                <button onClick={() => removeSkill(one)} className="btn btn-red"><i className="fa fa-window-close"></i></button>
                            </td>
                        </tr>    
                    ))}
                </table>
            </div>}
        </Fragment>
    )
}

AddSkill.propTypes = {
    addSkill: PropTypes.func.isRequired,
    removeSkill: PropTypes.func.isRequired,
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile : state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {addSkill, removeSkill, getProfileById})(withRouter(AddSkill))
