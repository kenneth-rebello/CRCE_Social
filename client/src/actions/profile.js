import axios from 'axios';
import {setAlert} from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE,ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILES} from './types';
import { body } from 'express-validator';


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

export const editPicture  = (formData, history) => async dispatch => {
    try {
        let config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }

        const res = await axios.post('/api/profile/picture', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Profile Picture Uploaded','dark'));

        history.push('/dashboard');

    } catch (err) {
        
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

        
        history.push(`/profile/${res.data._id}`);

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


export const addStatus = (formData, history) => async dispatch => {
    try {
        let config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/status', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Academic Status Added','dark'));

        history.push(`/profile/${res.data._id}`);

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


export const delStatus = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/status/${id}`);

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

export const removeSkill = (skill) => async dispatch => {
    
        let config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        console.log(skill)
        const body = {};
        body.skill = skill;

        const res = await axios.put('/api/profile/skill/remove', body, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Skill Removed','dark'));

    
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