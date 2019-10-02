import React ,{Fragment, useEffect}from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Spinner from '../layouts/Spinner'

const Eligible = ({eligible}) => {

    const {loading, students} = eligible;
    const company = students.shift()

    useEffect(() => {
        company && (document.title=`Eligible Students For ${company.company}`)
    },[company]);

    if(students.length<=0){
        return <Redirect to="/po_form"/>
    }
    return (
        <Fragment>
            { !loading ? (<Fragment>
                <h1 className="heading">Eligible students for placement at {`${company.company}`}</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Branch</th>
                        <th>CGPA</th>
                        <th>Backlogs</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                    </tr>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.user.name}</td>
                            <td>{student.user.year}</td>
                            <td>{student.user.branch}</td>
                            <td>{student.status[0].cgpa}</td>
                            <td>{student.status[0].backlogs}</td>
                            <td>{student.contact[0]}</td>
                            <td>{student.user.email}</td>
                        </tr>
                    ))}
                </table>
                {students.unshift(company)}
            <Link className="btn btn-dark" to="/print_list">Print List</Link>
            </Fragment>):
            (
                <Fragment>
                    <Spinner/>
                </Fragment>
            )
            }
        </Fragment>
    )
}

Eligible.propTypes = {
    eligible: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    eligible: state.eligible
})

export default connect(mapStateToProps,{})(Eligible)
