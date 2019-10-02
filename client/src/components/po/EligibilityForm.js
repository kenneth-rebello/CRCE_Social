import React, {useState, useEffect, Fragment} from 'react';
import {generateList} from '../../actions/admin';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const EligibilityForm = ({generateList, history}) => {

    useEffect(() => {
        document.title = 'Generate List Of Eligible Students For Placement-CRCE Social'
    },[]);

    const [formData, setFormData] = useState({
        companyName:'',
        pointer:'',
        backlogs:'',
        dept: ''
    });

    const {companyName, pointer, backlogs, dept} = formData;

    const Changer = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const Submitter = e => {
        e.preventDefault();
        generateList(formData, history);
    }

    return (
        <Fragment>
            <div className="profile-forms">
                <h1 className="heading">
                    Create Eligibility List
                </h1>
                <small>* = required field</small>
                <form className="form" onSubmit={e => Submitter(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Name Of Recruiting Company" name="companyName" value={companyName} onChange = {e => Changer(e)} required></input>
                    </div>
                    <div className="form-group">
                        <select name="dept" className="browser-default own-default" value={dept} onChange={e => Changer(e)}>
                            <option value="" disabled>Select the branch</option>
                            <option value="">ALL</option>
                            <option value="IT">IT</option>
                            <option value="COMPS">COMPS</option>
                            <option vlaue="ELEX">ELEX</option>
                            <option value="PROD">PROD</option>
                            <option value="MECH">MECH</option>
                            <option value="CSE">CSE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Minimum required pointer" name="pointer" value={pointer} onChange = {e => Changer(e)} required></input>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Number of permitted backlogs" name="backlogs" value={backlogs} onChange = {e => Changer(e)} required></input>
                    </div>

                    <input type="submit" className="btn btn-dark" value="Done"/>
                
                    <button className="btn btn-light"><Link to="/dashboard">Go Back</Link></button>
                </form>
            </div>
        </Fragment>
    )
}

EligibilityForm.propTypes = {
    generateList: PropTypes.func.isRequired,
}

export default connect(null, {generateList})(EligibilityForm)
