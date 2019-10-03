import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadChatUserTo} from '../../actions/chat'

const Userlist = ({auth, chat, loadChatUserTo, socket}) => {
    return (
        <div className="userlist">
            {!chat.loading&& !auth.loading && chat.users.map(user => (
                <button onClick={(e)=> loadChatUserTo(user.user, auth.user, socket)} className="singlechatbtn">
                    <div className="singlechat">
                        {user.picture && <img src={require(`../../../public/profile-pictures/${user.picture}`)} alt='...'></img>}
                        <h1 className="username">{user.user.name}</h1>
                    </div>
                </button>
            ))}
        </div>
    )
}

Userlist.propTypes = {
    chat: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loadChatUserTo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    chat: state.chat,
    auth: state.auth
})

export default connect(mapStateToProps,{loadChatUserTo})(Userlist)
