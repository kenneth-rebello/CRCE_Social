import {GET_PENDING_POSTS, GET_PENDING_USERS, PENDING_ERROR, REMOVE_PENDING} from '../actions/types';

const initialState = {
    posts: [],
    users: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){

    const {type, payload} = action;

    switch(type){
        case GET_PENDING_POSTS:
            return{
                ...state,
                posts: payload,
                loading: false
            }
        case GET_PENDING_USERS:
            return{
                ...state,
                users: payload,
                loading: false
            }
        case PENDING_ERROR:
            return{
                ...state,
                error: payload,
                loading:false
            }
        case REMOVE_PENDING:
            return{
                ...state,
                users: state.users.filter(each => each._id !== payload),
                loading:false
            }
        default:
            return state;
    }
}