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
        password_confirm: ''
    });

    const { name, email, password, password_confirm } = formData;

    const Changer = e => setFormData({...formData, [e.target.name]: e.target.value});

    const Submitter = e =>{
        e.preventDefault();
        if(password !== password_confirm) {
            props.setAlert('Passwords do not match', 'danger');

        }else{
            props.register({name, email, password});
        }
    }

    //Redirect if logged in
    if(props.isAuth){
        return <Redirect to="/dashboard"/>
    }
    
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => Submitter(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => Changer(e)}  />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => Changer(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        //minLength="6"
                        value={password} 
                        onChange={e => Changer(e)} 
                        //required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password_confirm"
                        //minLength="6"
                        value={password_confirm} 
                        onChange={e => Changer(e)} 
                        // required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </Fragment>    
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register)