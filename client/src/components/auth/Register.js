import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


const Register = (props) => {

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        branch:'',
        year:''
    });

    const { name, email, password, password_confirm, branch, year } = formData;

    const Changer = e => setFormData({...formData, [e.target.name]: e.target.value});

    const Submitter = e =>{
        e.preventDefault();
        if(password !== password_confirm) {
            props.setAlert('Passwords do not match', 'danger');

        }else{
            props.register({name, email, branch, year, password});
        }
    }

    //Redirect if logged in
    if(props.isAuth){
        return <Redirect to="/dashboard"/>
    }
    
    return (
        <Fragment>
            <div className="page">
                <div className="auth">
                    <div class="auth-box">
                    <h1 className="heading">Sign Up</h1>
                    <p className="lead">Create Your Account</p>
                    <form className="form" onSubmit={e => Submitter(e)}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" name="name" value={name} onChange={e => Changer(e)} />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => Changer(e)} />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value={password} 
                                onChange={e => Changer(e)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password_confirm"
                                minLength="6"
                                value={password_confirm} 
                                onChange={e => Changer(e)} 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select name="branch" value={branch} onChange={e => Changer(e)}>
                                <option value="">Select you branch</option>
                                <option value="IT">IT</option>
                                <option value="COMPS">COMPS</option>
                                <option vlaue="ELEX">ELEX</option>
                                <option value="PROD">PROD</option>
                                <option value="MECH">MECH</option>
                                <option value="CSE">CSE</option>
                                <option value="N/A">N/A</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select name="year" value={year} onChange={e => Changer(e)} >
                                <option value="">Select your current year</option>
                                <option value="N/A">N/A</option>
                                <option value="FE">FE</option>
                                <option value="SE">SE</option>
                                <option vlaue="TE">TE</option>
                                <option value="BE">BE</option>
                                <option value="ALUMNI">ALUMNI</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-dark" value="Register" />
                        </div>
                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
            
        </Fragment>    
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { setAlert, register })(Register)