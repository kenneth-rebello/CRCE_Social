import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getNotifs} from '../../actions/notif'
import Moment from 'react-moment'

const Notifications = ({notif, getNotifs}) => {

    useEffect(() => {
        getNotifs()
    },[getNotifs])
    return (
        <div className="notifs">
            {notif && notif.tray.map(each => (
            <div className="single-notif" key={each._id}>
                <div><img src={require(`../../../public/profile-pictures/${each.picture}`)}></img></div>
                <div className="notif-details">
                    {each.kind === 'msg' && <i className="fa fa-comment-alt"></i>}
                    <p>{each.text}</p>
                    <span><Moment format='DD/MM/YYYY HH:MM'>{each.date}</Moment></span>
                </div>
            </div>
            ))}
        </div>
    )
}

Notifications.propTypes = {
    getNotifs: PropTypes.func.isRequired,
    notif: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    notif: state.notif
})
export default connect(mapStateToProps, {getNotifs})(Notifications)
