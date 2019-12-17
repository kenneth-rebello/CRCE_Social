import React ,{useEffect, Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import {getEvent, sendReminder, sendCustomMail} from '../../actions/event'
import Spinner from '../layouts/Spinner'

const Event = ({getEvent, sendReminder, sendCustomMail, event:{event, loading}, match}) => {

    useEffect(()=>{
        event && (document.title = `${event.heading}`)
    },[event])
    useEffect(() => {
        getEvent(match.params.id);
    }, [getEvent, match])

    const Mailer = e =>{
        setMsg(e.target.value);
        setTimeout(()=>{
            setMsg('')
        },500000);
    }

    const [msg, setMsg] = useState('')

    return (
        <Fragment>
        <div className="single-event">
            {loading || event===null ? <Spinner/> : (<Fragment>
                <div className="events">
                    <div className="event-photo">
                        {!loading && event.url ? <img src={event.url} alt='...'/> 
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
                <button data-target="modal2" class="btn modal-trigger">Send Custom Message</button>
            </Fragment>)}
        </div>
        <div id="modal2" class="modal">
            <div class="modal-content">
                <h4 className="heading">Send a custom message to all recipents</h4>
                <textarea name='msg' value={msg} onChange={e => Mailer(e)} required></textarea>
            </div>
            <div class="modal-footer">
                <button onClick={() =>sendCustomMail(event._id, msg)} className="btn btn-dark">
                    <Link to="#!" class="modal-close waves-effect waves-green btn-flat">Send</Link>
                </button>
            </div>
        </div>     
        </Fragment>               
    )
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
    sendReminder: PropTypes.func.isRequired,
    sendCustomMail: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, {getEvent, sendReminder, sendCustomMail})(Event)
