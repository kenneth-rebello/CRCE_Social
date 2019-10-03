import axios from 'axios'
import {setAlert} from './alert'
import {GET_NOTIFS, GET_UNSEEN_NOTIFS, CLEAN, REMOVE_NOTIF, NOTIF_ERROR} from './types';

export const getNotifs = () => async dispatch => {

    try {

        dispatch({type: CLEAN});
        
        const res = await axios.get('/api/notif');

        dispatch({
            type: GET_NOTIFS,
            payload: res.data
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let body = {}
        body.tray = res.data

        dispatch(everydayCheck());

        await axios.post('/api/notif/seen', body, config)

        dispatch({
            type: GET_UNSEEN_NOTIFS,
            payload: []
        })

    } catch (err) {
        dispatch({
            type: NOTIF_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getUnseenNotifs = () => async dispatch => {

    try {

        const res = await axios.get('/api/notif/unseen');

        dispatch({
            type: GET_UNSEEN_NOTIFS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: NOTIF_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const eventNotif = (event) => async dispatch => {

    try {
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
    
        await axios.post('api/notif/event', event, config);

    } catch (err) {
        dispatch({
            type: NOTIF_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const likeNotif = (postID) => async dispatch => {

    try {
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
    
        const body = JSON.stringify({id: postID})
        await axios.post('api/notif/like', body, config);

    } catch (err) {
        dispatch({
            type: NOTIF_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const everydayCheck = () => async dispatch => {

    try {
        await axios.get('api/notif/birthday');
    } catch (err) {
        dispatch({
            type: NOTIF_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const deleteNotif = (id) => async dispatch => {
   
    if(window.confirm('Remove notification?')){
        try {
            
            await axios.delete(`/api/notif/${id}`);

            dispatch({
                type: REMOVE_NOTIF,
                payload: id
            });

            dispatch(setAlert('Notification Removed', 'success'));

        } catch (err) {
            dispatch({
                type: NOTIF_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
}