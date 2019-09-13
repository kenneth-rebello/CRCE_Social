import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {delEducation} from '../../actions/profile'

const Education = ({ education, delEducation }) => {

    const educations = education.map(edu =>(
        <tr key={edu._id}>
            <td>{edu.institute}</td>
            <td>{edu.course}</td>
            <td>
                <Moment format='YYYY'>{edu.from}</Moment>
                - <Moment format='YYYY'>{edu.to}</Moment>
            </td>
            <td className="btn btn-danger" onClick={() => delEducation(edu._id)}>
                Delete
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2>Educational</h2>
            <table cellSpacing="10" cellPadding="10">
                <thead>
                    <tr>
                        <th>Institute</th>
                        <th>Course</th>
                        <th>Years</th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    delEducation: PropTypes.func.isRequired,
}

export default connect(null, {delEducation})(Education)
