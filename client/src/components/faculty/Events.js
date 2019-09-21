import React ,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getEvents} from '../../actions/event'
import Moment from 'react-moment'

const Events = ({event, getEvents}) => {

    useEffect(() => {
        getEvents();
    },[getEvents]);

    return (    
        <Fragment>
            <div className="events-btn-bar">
                <button className="btn btn-dark"><Link to="/my_events">Events For Me</Link></button>
            </div>
            {event.events.map(one =>(
                <div key={one.id} className="events">
                    <div className="event-photo">
                        {!event.loading && one.upload ? <img src={require(`../../../public/events/${one.upload}`)}/> 
                            : <p>No image</p>}
                    </div>
                    <div className="event-details">
                        <h1 className="heading">{one.heading}</h1>
                        <p className="desc">{one.desc}</p>
                        <span className="event-date">Date: <Moment format='DD/MM/YYYY'>{one.date}</Moment></span>
                        <span className="event-by">Created By: {one.name}</span>
                    </div>
                </div>
            ))}
        </Fragment>
    )
}

Events.propTypes = {
    event: PropTypes.object.isRequired,
    getEvents: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps,{getEvents})(Events)
