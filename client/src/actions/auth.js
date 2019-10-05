import axios from 'axios';
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,CLEAR_PROFILE, FOLLOW, UNFOLLOW } from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const sendConfirmation = (id) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({id});

    try {

        await axios.post('/api/auth/send_confirmation', body, config);
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }

}

//Register A User
export const register = ({name, email, branch, year, password, history}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, branch, year, password});

    try {
        const res = await axios.post('/api/users', body, config);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert(`${name} registered`, 'danger'));
        dispatch(sendConfirmation(res.data.id))
        // dispatch(loadUser());
        history.push('/login')
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

//Login User

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {

        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    });
}

export const followUser = (profileId) => async dispatch =>{
    
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let body={}
    body.id = profileId

    const res = await axios.put('/api/profile/follow', body, config);
    
    dispatch({
        type: FOLLOW,
        payload: res.data
    })

    dispatch(setAlert('Following'));
}

export const unfollowUser = profileId => async dispatch => {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body={}
    body.id = profileId

    const res = await axios.put('/api/profile/unfollow', body, config);
    
    dispatch({
        type: UNFOLLOW,
        payload: res.data
    })

    dispatch(setAlert('Unfollowed'));
}

export const confirmEmail = (email, id) => async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, id});
    
        const res = await axios.post('/api/auth/confirm_email', body, config)

        if(res.data.check){
            dispatch(setAlert('Email Confirmed'));
            dispatch(loadUser())
        }else{
            dispatch(setAlert('Email Confirmation Failed'));
        }
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }

}