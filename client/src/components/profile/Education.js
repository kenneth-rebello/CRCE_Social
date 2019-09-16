import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {delEducation} from '../../actions/profile'

const Education = ({ education, delEducation }) => {

    const educations = education.map(edu =>(
        <tr key={edu._id}>
            <td><strong>Institute:</strong>{edu.institute}</td>
            <td><strong>Course:</strong>{edu.course}</td>
            <td>
            <strong>Years:</strong>
                <Moment format='YYYY'>{edu.from}</Moment>
                - <Moment format='YYYY'>{edu.to}</Moment>
            </td>
            <td>
                <button className="btn btn-red" onClick={() => delEducation(edu._id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <div className="education">
                <table cellSpacing="10" cellPadding="10">
                    <tbody>
                        {educations}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    delEducation: PropTypes.func.isRequired,
}

export default connect(null, {delEducation})(Education)
