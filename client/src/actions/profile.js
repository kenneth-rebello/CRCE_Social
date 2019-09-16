import axios from 'axios';
import {setAlert} from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE,ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES} from './types';


export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, stats: err.response.status}
        });
    }
};

export const getAllProfiles = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile');

        dispatch({type: CLEAR_PROFILE});

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, stats: err.response.status}
        });
    }

}

export const getProfileById = (userID) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userID}`);

        console.log('in profileaction')
        console.log(userID)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, stats: err.response.status}
        });
    }
};

export const createProfile = (formData, history, edit=false) => async dispatch => {
    try {
        let config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit?'Profile Updated':'Profile Created','success'));

        if(!edit){
            console.log('HISTORY OBJECT - profile.js : 40')
            console.log(history);
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const addEducation = (formData, history) => async dispatch => {
    try {
        let config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Educational Qualification Added','dark'));

        
        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const delEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const addSkill = (formData) => async dispatch => {
    try {
        let config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/skill', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Skill Added','dark'));

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const delAccount = () => async dispatch => {

    if(window.confirm('Are you sure? This can NOT be undone.')) {
        try {
            await axios.delete('/api/profile');
    
            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: ACCOUNT_DELETED
            });

            dispatch(setAlert('Your account has been successfully deleted'));
    
        } catch (err) {
            
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}