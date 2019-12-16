import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Img from 'react-image'
import {Link} from 'react-router-dom';
import {getNotifs, deleteNotif} from '../../actions/notif'
import Moment from 'react-moment'

const Notifications = ({notif, getNotifs, deleteNotif}) => {

    useEffect(()=> {
        document.title = 'Notifications - Edu-Social'
    })
    useEffect(() => {
        getNotifs()
    },[getNotifs])
    return (
        <div className="notifs">
            {notif && notif.tray.map(each => (
            <div className="single-notif" key={each._id}>
                {each.picture ? <div><Img src={require(`../../../public/profile-pictures/${each.picture}`)} alt='...'/></div>
                : <div></div>}
                <div className="notif-details">
                    <p>{each.kind === "msg" && <i className="fa fa-inbox"></i>}
                    {each.kind === "birthday" && <i className="fa fa-birthday-cake"></i>}
                    {each.kind === "post" && <i className="fa fa-thumbs-up"></i>}
                    {each.kind === "event" && <i className="fa fa-calendar-day"></i>}
                    {` `}{each.text}</p>
                    {each.kind === "msg" && <Link to={`/chat`}>Go To Chat</Link>}
                    {each.kind === "birthday" && <Link to={`/profile/${each.refer}`}>Go To Profile</Link>}
                    {each.kind === "post" && <Link to={`/post/${each.refer}`}>Go To Post</Link>}
                    {each.kind === "event" && <Link to={`/event/${each.refer}`}>Go To Event</Link>}
                    <span><Moment format='DD/MM/YYYY HH:MM'>{each.date}</Moment></span>
                    <span style={{float:'right', display:'inline'}}>
                        <button className="btn btn-red" onClick={() => deleteNotif(each._id)}><i className="fa fa-trash"></i>
                    </button></span>
                </div>
            </div>
            ))}
        </div>
    )
}

Notifications.propTypes = {
    getNotifs: PropTypes.func.isRequired,
    deleteNotif: PropTypes.func.isRequired,
    notif: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    notif: state.notif
})
export default connect(mapStateToProps, {getNotifs, deleteNotif})(Notifications)
