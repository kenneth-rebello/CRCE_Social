import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import pending from './pending';
import eligible from './eligible';
import event from './event';
import chat from './chat';
import notif from './notif';

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    pending,
    eligible,
    event,
    chat,
    notif
});