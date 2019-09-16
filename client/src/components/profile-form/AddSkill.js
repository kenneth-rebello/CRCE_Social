import React, {useState, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addSkill} from '../../actions/profile'

const AddSkill = ({addSkill}) => {

    const [formData, setFormData] = useState({
        skill:''
    });

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
        </Fragment>
    )
}

AddSkill.propTypes = {
    addSkill: PropTypes.func.isRequired,
}

export default connect(null, {addSkill})(withRouter(AddSkill))
