import React, {useState, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addEducation} from '../../actions/profile'

const AddEducation = ({addEducation, history}) => {

    const [formData, setFormData] = useState({
        institute:'',
        course:'',
        to:'',
        from:''
    });

    const {institute, course, from, to} = formData;

    const Changer = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const Submitter = e => {
        e.preventDefault();
        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                Add any school or college that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => Submitter(e)}>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or College"
                    name="institute"
                    value={institute}
                    onChange = {e => Changer(e)}
                    required
                ></input>
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Course"
                    name="course"
                    value={course}
                    onChange = {e => Changer(e)}
                    required
                ></input>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange = {e => Changer(e)}></input>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange = {e => Changer(e)}></input>
                </div>
                <input type="submit" className="btn brick"></input>
                <Link className="btn black" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation))
