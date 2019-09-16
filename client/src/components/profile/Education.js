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
            <td>
                <button className="btn btn-red" onClick={() => delEducation(edu._id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <div className="education">
                <h2 className="heading">Educational Qualifications</h2>
                <table cellSpacing="10" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Institute</th>
                            <th>Course</th>
                            <th>Years</th>
                            <th>{`    `}</th>
                        </tr>
                    </thead>
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
