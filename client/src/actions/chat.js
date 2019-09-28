import axios from 'axios'
import {ADD_MESSAGE, MESSAGE_RECEIVED, ADD_USER, GET_MSGS} from './types';
import { Types } from 'mongoose';

export const addMessageAction = (socket, msg) => async dispatch => {

    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = {} 
    body.msg = msg;

    const res = await axios.post(`/api/chat/newmessage`, body, config)

    dispatch({
        type: ADD_MESSAGE,
        payload: res.data
    });

    socket.emit('sendmessage')
}

export const updateMessageState = (allmsgs) => async dispatch => {

    dispatch({
        type: GET_MSGS,
        payload: allmsgs
    });

}

export const addUser = (user) => async dispatch => {
    dispatch({
        type:ADD_USER,
        user: user
    })
}

export const messageReceived = (message, sender) => async dispatch => {
    
    dispatch({
        type: MESSAGE_RECEIVED,
        // payload: res.data
    })
}

export const populateUserList = users => async dispatch =>{
    dispatch({
        type: Types.LIST_USERS,
        // payload: res.data
    })
}