import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


const Register = ({register, setAlert, history, user, isAuth}) => {

    useEffect(() => {
        document.title = 'Register A New Account - CRCE Social'
    },[]);

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        branch:'',
        year:''
    });

    const [ptooltip, setPTooltip] = useState('');
    const [etooltip, setETooltip] = useState('');
    const [ctooltip, setCToolTip] = useState('');


    const { name, email, password, password_confirm, branch, year } = formData;

    const Changer = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if(e.target.name === "password"){
            e.target.value.length > 5 || e.target.value.length === 0 ? setPTooltip('') : setPTooltip('Password too short')
        }
        if(e.target.name === 'email'){
            e.target.value.includes('@') || e.target.value.length === 0 ? setETooltip('') : setETooltip('Not a valid email')
        }
        if(e.target.name === "password_confirm"){
            e.target.value === password || e.target.value.length === 0 ? setCToolTip('') : setCToolTip('Passwords do not match')
        }
    }

    const Submitter = e =>{
        e.preventDefault();
        if(password !== password_confirm) {
            setAlert('Passwords do not match', 'danger');

        }else{
            register({name, email, branch, year, password, history});
        }
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
                        {etooltip!=='' && <span className="tooltip-alert"><i className="fa fa-exclamation-triangle"></i>{etooltip}</span>}
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
                        {ptooltip!=='' && <span className="tooltip-alert"><i className="fa fa-exclamation-triangle"></i>{ptooltip}</span>}
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
                        {ctooltip!=='' && <span className="tooltip-alert"><i className="fa fa-exclamation-triangle"></i>{ctooltip}</span>}
                        <div className="form-group">
                            <select name="branch" value={branch} className="browser-default own-default" onChange={e => Changer(e)}>
                                <option value="" disabled>Select you branch</option>
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
                            <select name="year" value={year} className="browser-default own-default" onChange={e => Changer(e)} >
                                <option value="" disabled>Select your current year</option>
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