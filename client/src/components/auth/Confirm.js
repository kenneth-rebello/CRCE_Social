import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {confirmEmail} from '../../actions/auth'

const Confirm = ({confirmEmail, match}) => {

    useEffect(() => {
        document.title = 'Email Confirmation - CRCE Social'
        confirmEmail(match.params.email, match.params.id)
    },[confirmEmail, match])

    return (
        <div>
            <h1 className="heading">Your email id is being confirmed</h1>
            <Link to="/login">Login to CRCE Social</Link>
        </div>
    )
}

Confirm.propTypes = {
    confirmEmail: PropTypes.func.isRequired,
}

export default connect(null, {confirmEmail})(Confirm)
