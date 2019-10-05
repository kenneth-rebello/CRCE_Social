import React,{Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {searchProfiles} from '../../actions/profile';


const SearchProfile = ({searchProfiles}) => {

    const [terms, setTerms] = useState('');

    const Changer = e => {
        setTerms(e.target.value);
        searchProfiles(terms);
    }

    const Submitter = e => {
        e.preventDefault();
        setTerms(e.target.value);
        searchProfiles(terms);
    }

    return (
        <Fragment>
            <div className="search-profiles">
                <form>
                    <div className="form-group"  onSubmit={e => Submitter(e)}>
                        <input type='text' placeholder="Enter name of user" name="terms" value={terms} onChange={(e)=>Changer(e)} required></input>
                    </div>
                    <input type="submit" className="btn" value="Search"></input>
                </form>
            </div>
        </Fragment>
    )
}

SearchProfile.propTypes = {
    searchProfiles: PropTypes.func.isRequired,
}

export default connect(null, {searchProfiles})(SearchProfile)
