import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import pending from './pending';
import eligible from './eligible';

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    pending,
    eligible
});