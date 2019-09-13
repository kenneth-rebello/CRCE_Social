import axios from 'axios';
import {setAlert} from './alert';
import {GET_POSTS, POST_ERROR, ADD_POST, CLEAR_POSTS, UPDATE_LIKES, GET_PENDING_POSTS, GET_PENDING_USERS, PENDING_ERROR} from './types';

export const getPosts = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/posts');

        dispatch({
            type:GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getUserPosts = user_id => async dispatch => {
     
    try {
        const res = await axios.get(`/api/posts/user/${user_id}`);
        
        dispatch({type:CLEAR_POSTS});
        dispatch({
            type:GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const addPost = formData => async dispatch => {
    
    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    }
   
    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const addLike = (postId) => async dispatch => {
    try {
        
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type:UPDATE_LIKES,
            payload: {id:postId, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const removeLike = (postId) => async dispatch => {
    try {
        
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        
        dispatch({
            type:UPDATE_LIKES,
            payload: {id:postId, likes: res.data}
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getPendingPosts = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/admin/posts');

        dispatch({
            type: GET_PENDING_POSTS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: PENDING_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}