import React ,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getByEvents, interested, notInterested} from '../../actions/event'
import Moment from 'react-moment'

const Events = ({auth, event, getByEvents, interested, notInterested}) => {

    useEffect(() => {
        getByEvents();
    },[getByEvents]);

    return (    
        <Fragment>
            <div className="events-btn-bar">
                <button className="btn btn-dark"><Link to="/events">All Events</Link></button>
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
                        <div className="event-footer">
                            <div>
                                <span className="event-date">Date: <Moment format='DD/MM/YYYY'>{one.date}</Moment></span>
                                <span className="event-by">Created By: <Link to={`/profile/${one.user._id}`}>{one.name}</Link></span>
                            </div>

                            { auth && auth.user && (<Fragment>
                            { one.interested.filter(int => int.user === auth.user._id).length>0 ? (
                                <button type="button" className="btn btn-red" onClick={() => notInterested(one._id)}>
                                Not Interested
                                </button>
                            ):(
                                <button type="button" className="btn btn-green" onClick={() => interested(one._id)}>
                                Interested
                                </button>)
                            }
                            <span className="likes">{one.interested.length} people are interested</span>
                            {auth && auth.user.name === one.name && <button className="btn btn-light"><Link to={`/event/${one._id}`} className="links">
                                Check event details
                            </Link></button>}
                            </Fragment>)}
                        </div>                    
                    </div>
                </div>
            ))}
        </Fragment>
    )
}

Events.propTypes = {
    auth: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    getByEvents: PropTypes.func.isRequired,
    interested: PropTypes.func.isRequired,
    notInterested: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    event: state.event
})

export default connect(mapStateToProps,{getByEvents, interested, notInterested})(Events)