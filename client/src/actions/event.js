import axios from 'axios';
import { setAlert } from './alert'
import { ADD_EVENT, EVENT_ERROR, GET_EVENTS, GET_EVENT, UPDATE_INTERESTS } from './types';

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

export const getEvent = (id) => async dispatch => {
    try {
        
        const res = await axios.get(`/api/event/${id}`);

        dispatch({
            type:GET_EVENT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const interested = (id) => async dispatch => {
    try {
        
        const res = await axios.put(`/api/event/interested/${id}`);

        dispatch({
            type:UPDATE_INTERESTS,
            payload: {id:id, interested: res.data}
        })
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}


export const notInterested = (id) => async dispatch => {
    try {
        
        const res = await axios.put(`/api/event/notinterested/${id}`);
        
        dispatch({
            type:UPDATE_INTERESTS,
            payload: {id:id, interested: res.data}
        })
        
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}