import {GET_ELIGIBLE_USERS, CLEAN} from '../actions/types';

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
        case CLEAN:
            return{
                ...state,
                students:[]
            }
        default:
            return state;
    }
}