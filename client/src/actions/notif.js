import axios from 'axios'
import {GET_NOTIFS, GET_UNSEEN_NOTIFS} from './types';

export const getNotifs = () => async dispatch => {

    const res = await axios.get('/api/notif');

    dispatch({
        type: GET_NOTIFS,
        payload: res.data
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let body = {}
    body.tray = res.data

    await axios.post('/api/notif/seen', body, config)

}

export const getUnseenNotifs = () => async dispatch => {

    const res = await axios.get('/api/notif/unseen');

    dispatch({
        type: GET_UNSEEN_NOTIFS,
        payload: res.data
    })
}