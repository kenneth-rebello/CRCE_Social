import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const DashboardActions = () => {
    return (
      <Fragment>
        <div className="dash-buttons">
        <Link to="/edit_profile" className="btn btn-light"> Edit Profile</Link>
        <Link to="/add_education" className="btn btn-light"> Add Education</Link>
      </div>
      </Fragment>
    )
}

export default DashboardActions
