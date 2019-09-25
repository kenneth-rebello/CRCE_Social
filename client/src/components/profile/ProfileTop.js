import React,{Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const ProfileTop = ({ profile }) => {

    let {position, location, social, user ,contact, picture} = profile;
    let { name, avatar, year, branch, email } = user;

    const [showLinkedin, toggleLinkedin] = useState(false);
    const [showGithub, toggleGithub] = useState(false);
    const [showTwitter, toggleTwitter] = useState(false);
    const [showYoutube, toggleYoutube] = useState(false);
    const [showInsta, toggleInsta] = useState(false);
    const [showMobile, toggleMobile] = useState(false);
    const [showFB, toggleFB] = useState(false);
    const [showMail, toggleMail] = useState(false);

    return (
        <Fragment>
            <div className="profile-top bg-primary p-2">
                { picture && <img className="round-img" src={require(`../../../public/profile-pictures/${picture}`)} alt=""/>}
                <h1 className="heading">{name}</h1>
                <p>{year} - {branch}</p>
                <p>{location}</p>
                <div className="profile-contact">
                    <button className="btn btn-dark" onClick={() => toggleLinkedin(!showLinkedin)}><i className="fa fa-linkedin"></i></button>
                    <button className="btn btn-dark" onClick={() => toggleGithub(!showGithub)}><i className="fa fa-github"></i></button>
                    <button className="btn btn-dark" onClick={() => toggleTwitter(!showTwitter)}><i className="fa fa-twitter"></i></button>
                    <button className="btn btn-dark" onClick={() => toggleFB(!showFB)}><i className="fa fa-facebook"></i></button>
                    <button className="btn btn-dark" onClick={() => toggleInsta(!showInsta)}><i className="fa fa-instagram"></i></button>
                    <button className="btn btn-dark" onClick={() => toggleYoutube(!showYoutube)}><i className="fa fa-youtube-play"></i></button>
                    <button className="btn btn-dark" onClick={() => toggleMobile(!showMobile)}><i className="fa fa-mobile"></i></button>
                    <button className="btn btn-dark" onClick={() => toggleMail(!showMail)}><i className="fa fa-envelope"></i></button>
                </div>
                <div className="contact-details">
                    {showLinkedin && social.linkedin && <a href={`${social.linkedin}`} target='_blank'>{social.linkedin}</a>}
                    {showGithub && social.github && <a  href={`${social.github}`} target='_blank'>{social.github}</a>}
                    {showTwitter && social.twitter && <a  href={`${social.twitter}`} target='_blank'>{social.twitter}</a>}
                    {showFB && social.facebook && <a  href={`${social.facebook}`} target='_blank'>{social.facebook}</a>}
                    {showInsta && social.instagram && <a  href={`${social.instagram}`} target='_blank'>{social.instagram}</a>}
                    {showYoutube && social.youtube && <a  href={`${social.youtube}`} target='_blank'>{social.youtube}</a>}
                    {showMobile && contact && <a target='_blank'>{contact[0]}</a>}
                    {showMail && email && <a  href={`${email}`} target='_blank'>{email}</a>}
                </div>
            </div>
        </Fragment>
    )
}

ProfileTop.propTypes = {

}

export default ProfileTop