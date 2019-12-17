import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadChatUserTo} from '../../actions/chat'

const Userlist = ({auth, chat, loadChatUserTo, socket}) => {
    return (
        <div className="userlist">
            {!chat.loading&& !auth.loading && chat.users.map(user => (
                <div onClick={(e)=> loadChatUserTo(user.user, auth.user, socket)} className="singlechatbtn">
                    <div className="singlechat">
                        {user.picture && <img src={`/image/${user.picture}`} alt='...'/>}
                        <h1 className="username">{user.user.name}</h1>
                    </div>
                </div>
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
