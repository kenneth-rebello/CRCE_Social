import React ,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMyEvents} from '../../actions/event'
import Moment from 'react-moment'

const MyEvents = ({auth, event, getMyEvents}) => {

    useEffect(() => {
        document.title = 'Events For Me - Edu-Social'
    },[])

    useEffect(() => {
        getMyEvents();
    },[getMyEvents]);

    return (    
        <Fragment>
            <div className="events-btn-bar">
                <button className="btn btn-dark"><Link to="/events">All Events</Link></button>
            </div>
            {event.events.length > 0 ?
            <Fragment>
            {event.events.map(one =>(
                <div key={one.id} className="events">
                    <div className="event-photo">
                        {!event.loading && one.upload ? <img src={one.url} alt='...'/> 
                            : <p>No image</p>}
                    </div>
                    <div className="event-details">
                        {auth && auth.user && auth.user.name === one.name ? <h1 className="heading"><Link to={`/event/${one._id}`}>
                            {one.heading}
                        </Link></h1>:<h1 className="heading">
                            {one.heading}
                        </h1>}
                        <p className="desc">{one.desc}</p>
                        <span className="event-date">Date: <Moment format='DD/MM/YYYY'>{one.date}</Moment></span>
                        <span className="event-by">Created By: {one.name}</span>
                    </div>
                </div>
            ))}</Fragment> : <h1 className="heading">No Events To Show</h1>}
        </Fragment>
    )
}

MyEvents.propTypes = {
    event: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    getMyEvents: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    event: state.event,
    auth: state.auth
})

export default connect(mapStateToProps,{getMyEvents})(MyEvents)
