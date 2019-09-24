import React ,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import {getEvent, sendReminder} from '../../actions/event'
import Spinner from '../layouts/Spinner'

const Event = ({getEvent, sendReminder, event:{event, loading}, match}) => {

    useEffect(() => {
        getEvent(match.params.id)
    }, [getEvent])

    return (
        <div className="single-event">
            {loading || event===null ? <Spinner/> : (<Fragment>
                <div className="events">
                    <div className="event-photo">
                        {!loading && event.upload ? <img src={require(`../../../public/events/${event.upload}`)}/> 
                            : <p>No image</p>}
                    </div>
                    <div className="event-details">
                        <h1 className="heading">{event.heading}</h1>
                        <p className="desc">{event.desc}</p>
                        <div className="event-footer">
                            <div>
                                <span className="event-date">Date: <Moment format='DD/MM/YYYY'>{event.date}</Moment></span>
                                <span className="event-by">Created By: <Link to={`/profile/${event.user._id}`}>{event.name}</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="heading">Users interested in this event</h1>
                <div className="interested">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Year</th>
                        </tr>
                        {event.interested.map(each => {
                            return (<Fragment>
                                <tr>
                                    <td>{each.user.name}</td>
                                    <td>{each.user.branch}</td>
                                    <td>{each.user.year}</td>
                                </tr>
                            </Fragment>)
                        })}
                    </table>
                </div>
                <button className='btn btn-gold' onClick={() => sendReminder(event._id)}>Send Reminder</button>
                <span>Send a reminder email to all students about this event</span>
            </Fragment>)}
        </div>                    
    )
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
    sendReminder: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, {getEvent, sendReminder})(Event)
