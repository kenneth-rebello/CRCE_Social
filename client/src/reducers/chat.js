import {ADD_MESSAGE, MESSAGE_RECEIVED, ADD_USER, LIST_USERS, GET_MSGS} from '../actions/types';

const initialState = {
    users: [],
    messages: [],
    loading: true
}

export default function(state = initialState, action){

    const {payload, type} = action;

    switch(type){
        case MESSAGE_RECEIVED:
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
        case ADD_USER:
            return{
                ...state,
                users: [...state.users, payload]
            }
        case LIST_USERS:
            return{
                
            }
        default:
            return state;
    }
}