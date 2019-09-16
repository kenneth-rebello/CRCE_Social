import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {delStatus} from '../../actions/profile'

const Education = ({ status, delStatus }) => {

    const statuses = status.map(stat =>(
        <tr key={stat._id}>
            <td><strong>Semester:</strong>{stat.semester}</td>
            <td><strong>SGPA:</strong>{stat.sgpa}</td>
            <td><strong>CGPA:</strong>{stat.cgpa}</td>
            <td>
                <button className="btn btn-red" onClick={() => delStatus(stat._id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <div className="education">
                <table cellSpacing="10" cellPadding="10">
                    <tbody>
                        {statuses}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

Education.propTypes = {
    status: PropTypes.array.isRequired,
    delStatus: PropTypes.func.isRequired,
}

export default connect(null, {delStatus})(Education)
