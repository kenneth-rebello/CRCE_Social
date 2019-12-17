import React, {Fragment, useState, useEffect} from 'react';
import {Link, Redirect} from  'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = (props) => {

    useEffect(() => {
        document.title = 'Login - Edu-Social'
    },[]);

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const [ptooltip, setPTooltip] = useState('');
    const [etooltip, setETooltip] = useState('');
    
    const { email, password } = formData;

    const Changer = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if(e.target.name === "password"){
            e.target.value.length > 5 || e.target.value.length === 0 ? setPTooltip('') : setPTooltip('Password too short')
        }
        if(e.target.name === 'email'){
            e.target.value.includes('@') || e.target.value.length === 0 ? setETooltip('') : setETooltip('Not a valid email')
        }
    }

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
                    <div className="demo">
                        Demo Account
                        <br/>
                        <h1>Email: <u><b>test@gmail.com</b></u></h1>
                        <h1>Password: <u><b>qwertyuiop</b></u></h1>
                        <p>Mobile friendly display updates coming soon...</p>
                    </div>
                    <div className="auth-box">
                        <h1 className="heading">Login</h1>
                        <form className="form" onSubmit={e => Submitter(e)}>
                            <div className='form-group'>
                                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => Changer(e)} required/>
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
