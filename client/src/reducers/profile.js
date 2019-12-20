import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_PROFILES, REMOVE_PROFILE, CLEAN} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state=initialState, action){

    const {type, payload} = action;

    switch(type){
        case GET_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                loading: false
            }
        case UPDATE_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        case REMOVE_PROFILE:
            return{
                ...state,
                profile:null,
                profiles: state.profiles.filter(profile => profile._id !== payload)
            }
        case CLEAN:
            return{
                ...state,
                profiles:[]
            }
        default:
            return state;
    }
}