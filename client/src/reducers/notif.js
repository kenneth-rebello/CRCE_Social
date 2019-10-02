import {GET_NOTIFS, ADD_NOTIF, REMOVE_NOTIF, GET_UNSEEN_NOTIFS} from '../actions/types';

const initialState = {
    tray: [],
    unseen: [],
    loading: true
}

export default function(state = initialState, action){

    const {payload, type} = action;

    switch(type){
        case GET_NOTIFS:
            return{
                ...state,
                tray: payload,
                loading: false
            }
        case GET_UNSEEN_NOTIFS:
            return{
                ...state,
                unseen: payload,
                loading: false
            }
        case ADD_NOTIF:
            return{
                ...state,
                tray: [...state.tray, payload]
            }
        default:
            return state
    }
}