import axios from 'axios';
import {setAlert} from './alert';
import {GET_PENDING_POSTS, GET_PENDING_USERS, PENDING_ERROR } from './types';
import { getPendingPosts, getPosts} from './post';

export const approvePost = (postId) => async dispatch =>{
    try {

        const res = await axios.get(`/api/admin/approve/${postId}`);
        
        dispatch(getPendingPosts());
        dispatch(getPosts());
        
    } catch (err) {
        dispatch({
            type: PENDING_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });   
    }
}