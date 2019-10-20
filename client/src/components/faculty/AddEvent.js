import React ,{useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addEvent} from '../../actions/event'

const AddEvent = ({addEvent, history}) => {

    useEffect(() => {
        document.title = 'Add A New Event - CRCE Social'
    })

    const [formData, setFormData] = useState({
        date:'',
        heading:'',
        desc:'',
        target: '',
    });
    const [fileData, setFileData] = useState('');
    const [fileName, setFileName] = useState('');

    let { date, heading, desc, target} = formData;
    const Changer = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const Handler = e =>{
        setFileData(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const Submitter = e => {
        e.preventDefault();
        const newFormData = new FormData();
        fileData && newFormData.append("file",fileData);
        newFormData.append("date",formData.date);
        newFormData.append("heading",formData.heading);
        newFormData.append("desc",formData.desc);
        newFormData.append("target",formData.target);
        addEvent(newFormData, history);
    }

    return (
        <div className="event-form">
            <div>
                <h1 className="heading">Create an event</h1>
            </div>
            <form className="form" onSubmit={e => Submitter(e)}>
                <input type="text" name="heading" value={heading} placeholder="Enter event title" onChange={e => Changer(e)}/>
                <textarea
                name="desc"
                type="text" 
                cols="90"
                rows="10"
                placeholder="Event description"
                value={desc}
                onChange={e => Changer(e)}
                required></textarea><br/>
                <span>Enter event date</span>
                <input type="date" name="date" value={date} onChange={e => Changer(e)}/>
                <select name="target" onChange={e => Changer(e)} value={target} className="browser-default own-default" multiple>
                    <option value="" disabled>Select a target audience</option>
                    <option value="FE">FE</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                    <option value="IT">IT</option>
                    <option value="COMPS">COMPS</option>
                    <option value="PROD">PROD</option>
                    <option value="ELEX">ELEX</option>
                    <option value="MECH">MECH</option>
                    <option value="CSE">CSE</option>
                </select>
                <i className="fa fa-file-image-o"></i><input name="upload" type="file" className="btn btn-light" onChange ={e => Handler(e)} accept=".jpg, .jpeg, .bmp, .png, .gif"/>
                <input type="submit" className="btn btn-dark" value="Add" />
            </form>
        </div>
    )
}

AddEvent.propTypes = {
    addEvent: PropTypes.func.isRequired,
}

export default connect(null,{addEvent})(AddEvent)
