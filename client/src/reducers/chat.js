import {ADD_MESSAGE, MESSAGE_RECEIVED, GET_MSGS, GET_CHAT_USERS, LOAD_CHAT_TO} from '../actions/types';

const initialState = {
    to: null,
    users: [],
    messages: [],
    loading: true
}

export default function(state = initialState, action){

    const {payload, type} = action;

    switch(type){
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload],
                loading: false
            }
        case GET_MSGS:
            return {
                ...state,
                messages: payload,
                loading: false
            }
        case GET_CHAT_USERS:
            return{
                ...state,
                users: payload,
                loading: false
            }
        case LOAD_CHAT_TO:
            return{
                ...state,
                to: payload,
                loading:false
            }
        default:
            return state;
    }
}