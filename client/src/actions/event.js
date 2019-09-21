import axios from 'axios';
import { setAlert } from './alert'
import { ADD_EVENT, EVENT_ERROR, GET_EVENTS } from './types';

export const addEvent = (formData, history) => async dispatch =>{

    const config = {
        headers:{
            'Content-Type' : 'application/json'
        }
    }
   
    try {

        const res = await axios.post('/api/event', formData, config);

        dispatch({
            type: ADD_EVENT,
            payload: res.data
        });

        dispatch(setAlert('Event Created', 'success'));

        history.push('/events');

    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}


export const getEvents = () => async dispatch => {

    try {

        const res = await axios.get('/api/event');

        dispatch({
            type: GET_EVENTS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const getMyEvents = () => async dispatch => {
    try {

        const res = await axios.get('/api/event/me');

        dispatch({
            type: GET_EVENTS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}