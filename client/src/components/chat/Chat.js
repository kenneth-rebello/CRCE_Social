import React,{Fragment} from 'react'
import './chat.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import io from "socket.io-client"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Userlist from '../chat/Userlist';
import Moment from 'react-moment';
import * as chatActions from '../../actions/chat'


let socket;

class Chat extends React.Component {

    constructor({props})
    {
        super(props)
        
        this.state = {
          msg: ''
        }

        socket = io.connect("http://localhost:5000");

        this.sendMessage = this.sendMessage.bind(this);
        this.getData = this.getData.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

    }

    sendMessage = (msg) =>{
        this.props.actions.addMessageAction(socket, msg, this.props.chat.to._id);
        this.setState({msg:''})
    }

    getData = allMsgs => {
        allMsgs && this.props.actions.updateMessageState(allMsgs);
        let obj = document.getElementById('get-down');
        obj && (obj.scrollTop = obj.scrollHeight - obj.clientHeight + 1500);
    }

    changeData = () => {
        let data={};
        data.to = !this.props.chat.loading && this.props.chat.to._id;
        data.from = !this.props.auth.loading && this.props.auth.user._id;
        socket.emit('initial_data', data)
        let obj = document.getElementById('get-down');
        obj && (obj.scrollTop = obj.scrollHeight - obj.clientHeight + 1500);
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.sendMessage(this.state.msg)
        }
    }

    componentDidMount (){
        document.title = 'Chat - Edu-Social'
        socket.emit("initial_data" ,null);
        socket.on("get_data", this.getData);
        socket.on("change_data", this.changeData);
        this.props.actions.getAllChatUsers();
        let obj = document.getElementById('get-down');
        obj && (obj.scrollTop = obj.scrollHeight - obj.clientHeight );
    }

    componentWillUnmount() {
        socket.off('get_data');
        socket.off('change_data');
        socket.disconnect()
    }

    render() {
        
        return(
            <Fragment>
            { !this.props.auth.loading && this.props.auth.user && this.props.auth.user.approved ? <div className="chat-window">
                <div className="user-bar">
                    <Userlist socket={socket}/>
                </div>
                <div className="messages">
                    {this.props.chat.to && <h1 className="userhead heading"><Link to={`/profile/${this.props.chat.to._id}`}>
                        {this.props.chat.to.name}
                    </Link></h1>}
                    <div className="message-list" id="get-down">
                        {!this.props.chat.loading && this.props.chat.messages.map(msg => (
                            <Fragment>
                                {!this.props.auth.loading && this.props.auth.user._id === msg.user._id ? <div className="message msg-me">
                                    <h1>{msg.user.name}</h1>
                                    <p>{msg.text}</p>
                                    <span><Moment format='DD/MM HH:MM'>{msg.date}</Moment></span>
                                </div> : <div className="message msg-you">
                                    <h1>{msg.user.name}</h1>
                                    <p>{msg.text}</p>
                                    <span><Moment format='DD/MM HH:MM'>{msg.date}</Moment></span>
                                </div>}
                            </Fragment>
                        ))}
                    </div>
                    {!this.props.chat.loading && this.props.chat.to && <div className="new-message">
                        <input id='newmsg' type="text" onKeyDown={(e) => this.handleKeyDown(e)} onChange = {e => {this.setState({msg: e.target.value })}} value={this.state.msg} placeholder="New Message"></input> 
                        <button className="btn btn-dark" onClick={() => this.sendMessage(this.state.msg)}>Send</button>
                    </div>}
                </div>
            </div> : <h1 className="heading">You have to be approved by an admin to start chatting with other users. Kindly wait until approved</h1>}
            </Fragment>
        )
    }
}

Chat.propTypes = {
    chat: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    chat: state.chat,
    auth: state.auth
})

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(chatActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)