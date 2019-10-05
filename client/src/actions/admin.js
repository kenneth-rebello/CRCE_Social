import axios from 'axios';
import { GET_PENDING_USERS, PENDING_ERROR, GET_ELIGIBLE_USERS, REMOVE_PENDING, REMOVE_PROFILE, CLEAN } from './types';
import { getPendingPosts, getPosts} from './post';
import {setAlert} from './alert';

export const approvePost = (postId) => async dispatch =>{
    try {

        await axios.get(`/api/admin/approve/post/${postId}`);
        
        dispatch(getPendingPosts());
        dispatch(getPosts());
        
    } catch (err) {
        dispatch({
            type: PENDING_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
}

export const approveUser = (userId) => async dispatch =>{
    try {

        await axios.get(`/api/admin/approve/user/${userId}`);
        
        dispatch(getPendingUsers());
        
    } catch (err) {
        dispatch({
            type: PENDING_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
}


export const rejectUser = (id) => async dispatch => {
    try {
        
        const res = await axios.get(`/api/admin/reject/user/${id}`);

        dispatch({
            type: REMOVE_PENDING,
            payload: res.data._id
        })

    } catch (err) {
        dispatch({
            type: PENDING_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getPendingUsers = () => async dispatch => {
    try {

        dispatch({type: CLEAN})
        
        const res = await axios.get('/api/admin/users');

        dispatch({
            type: GET_PENDING_USERS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PENDING_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const delUser = (id) => async dispatch => {
    try {
        
        await axios.delete(`/api/admin/user/${id}`);

        dispatch({
            type: REMOVE_PROFILE,
            payload: id
        })

        dispatch(setAlert('User Deleted','dark'));
    } catch (err) {
        
    }
}

export const generateList = (formData, history) => async dispatch =>{
    try{

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const res = await axios.post('/api/admin/po/eligible', formData, config);
        res.data.unshift({"company": formData.companyName})
        dispatch({
            type: GET_ELIGIBLE_USERS,
            payload: res.data
        })

        history.push('/eligible_students')

    } catch(err) {
        console.log(err);
    }
}