import {ADD_EVENT, EVENT_ERROR, DELETE_EVENT, GET_EVENTS, GET_EVENT, UPDATE_INTERESTS} from '../actions/types';

const initialState = {
    events: [],
    event: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action){

    const {type, payload} = action;

    switch(type){
        case ADD_EVENT:
            return{
                ...state,
                events: [...state.events, payload],
                loading: false
            }
        case GET_EVENTS:
            return{
                ...state,
                events: payload,
                loading: false
            }
        case GET_EVENT:
            return{
                ...state,
                event: payload,
                loading: false
            }
        case DELETE_EVENT:
            return{
                ...state,
                events: state.events.filter(event => event._id !== payload),
                loading:false
            }
        case EVENT_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_INTERESTS:
            return{
                ...state,
                events: state.events.map(event => event._id === payload.id ? {...event, interested:payload.interested} : event),
                loading:false
            }
        default:
            return state;
    }

}