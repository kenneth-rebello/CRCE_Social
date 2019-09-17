import axios from 'axios';
import { GET_PENDING_USERS, PENDING_ERROR } from './types';
import { getPendingPosts, getPosts} from './post';

export const approvePost = (postId) => async dispatch =>{
    try {

        const res = await axios.get(`/api/admin/approve/post/${postId}`);
        
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

        const res = await axios.get(`/api/admin/approve/user/${userId}`);
        
        dispatch(getPendingUsers());
        
    } catch (err) {
        dispatch({
            type: PENDING_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
}

export const getPendingUsers = () => async dispatch => {
    try {
        
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

export const generateList = (formData, history) => async dispatch =>{
    
}