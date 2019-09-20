import {GET_ELIGIBLE_USERS} from '../actions/types';

const initialState = {
    students:[],
    loading: true
}

export default function(state = initialState, action){

    const {payload, type} = action;

    switch(type){
        case GET_ELIGIBLE_USERS:
            return {
                ...state,
                students: payload,
                loading:false
            }
        default:
            return state;
    }
}