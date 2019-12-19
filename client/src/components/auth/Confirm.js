import React, {useEffect} from 'react'
import './styles/auth.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {confirmEmail} from '../../actions/auth'

const Confirm = ({confirmEmail, match}) => {

    useEffect(() => {
        document.title = 'Email Confirmation - Edu-Social'
        confirmEmail(match.params.email, match.params.id)
    },[confirmEmail, match])

    return (
        <div>
            <h1 className="heading">Your email id is being confirmed</h1>
            <Link to="/login">Login to Edu-Social</Link>
        </div>
    )
}

Confirm.propTypes = {
    confirmEmail: PropTypes.func.isRequired,
}

export default connect(null, {confirmEmail})(Confirm)
