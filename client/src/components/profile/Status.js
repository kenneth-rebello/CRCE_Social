import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {delStatus} from '../../actions/profile'

const Education = ({ auth, user, status, delStatus }) => {

    const statuses = status.map(stat =>(
        <tr key={stat._id}>
            <td><strong>Semester:</strong>{stat.semester}</td>
            <td><strong>SGPA:</strong>{stat.sgpa}</td>
            <td><strong>CGPA:</strong>{stat.cgpa}</td>
            <td>
                {!auth.loading && auth && user._id===auth.user._id && stat._id===status[0]._id && <button className="btn btn-red" onClick={() => delStatus(stat._id)}>Delete</button>}
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
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    status: PropTypes.array.isRequired,
    delStatus: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {delStatus})(Education)
