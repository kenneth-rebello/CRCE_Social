import axios from 'axios';
import {setAlert} from './alert';
import {GET_POSTS, POST_ERROR, ADD_POST} from './types';

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