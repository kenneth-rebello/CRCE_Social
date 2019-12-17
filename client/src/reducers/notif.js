import {GET_NOTIFS, ADD_NOTIF, REMOVE_NOTIF, GET_UNSEEN_NOTIFS, NOTIF_ERROR, CLEAN} from '../actions/types';

const initialState = {
    tray: [],
    unseen: [],
    error:'',
    status: '',
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
        case REMOVE_NOTIF:
            return{
                ...state,
                tray: state.tray.filter(notif => notif._id !== payload),
                loading: false
            }
        case CLEAN:
            return{
                ...state,
                tray: []
            }
        case NOTIF_ERROR:
            return{
                ...state,
                error: payload.msg,
                status: payload.status,
                loading:false
            };
        default:
            return state
    }
}