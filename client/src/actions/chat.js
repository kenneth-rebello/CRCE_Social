import axios from 'axios'
import {ADD_MESSAGE, GET_MSGS, GET_CHAT_USERS, LOAD_CHAT_TO} from './types';


export const addMessageAction = (socket, msg, to) => async dispatch => {

    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = {} 
    body.msg = msg;
    body.to = to;

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

export const loadChat = (me, to) => async dispatch => {

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    let body={}
    body.me = me;
    body.to = to;

    const res = await axios.get('/api/chat/load', body, config);


} 

export const loadChatUserTo = (user, me, socket) => dispatch => {

    dispatch({
        type: LOAD_CHAT_TO,
        payload: user
    })

    let data ={}
    data.to = user._id;
    data.from = me._id;

    socket.emit('initial_data', data);
}

export const getAllChatUsers = () => async dispatch => {

    const res = await axios.get('/api/chat/users');

    dispatch({
        type: GET_CHAT_USERS,
        payload: res.data
    })

}