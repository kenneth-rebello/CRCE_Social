import React, {Fragment, useState} from 'react';
import {Link, Redirect} from  'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = (props) => {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const Changer = e => setFormData({...formData, [e.target.name]: e.target.value});

    const Submitter = async e =>{
        e.preventDefault();
        props.login(email, password);
    }

    //Redirect if logged in
    if(props.isAuth){
        return <Redirect to="/dashboard"/>
    }
    
    return (
        <Fragment>
            <div className="page">
                <div className="auth">
                    <div className="auth-box">
                        <h1 className="heading">Login</h1>
                        <form className="form" onSubmit={e => Submitter(e)}>
                            <div className='form-group'>
                            <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => Changer(e)} required/>
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
                                <input type="submit" className="btn btn-dark" value="Login" />
                            </div>
                        </form>
                        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                    </div>
                </div>
            </div>
            
        </Fragment>    
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login)
