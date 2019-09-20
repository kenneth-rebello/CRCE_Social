import React ,{Fragment}from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner'

const Eligible = ({eligible}) => {

    const {loading, students} = eligible;
    const company = students.shift()
    return (
        <Fragment>
            { !loading ? (<Fragment>
                <h1 className="heading">Eligible students for placement at {`${company.company}`}</h1>
                <table>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.user.name}</td>
                            <td>{student.user.branch}</td>
                            <td>{student.user.year}</td>
                            <td>{student.status[0].cgpa}</td>
                        </tr>
                    ))}
                </table>
            </Fragment>):(
                <Fragment>
                    <Spinner/>
                </Fragment>
            )
            }
        </Fragment>
    )
}

Eligible.propTypes = {
    students: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    eligible: state.eligible
})

export default connect(mapStateToProps,{})(Eligible)
