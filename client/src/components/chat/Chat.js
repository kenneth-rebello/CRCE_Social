import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import io from "socket.io-client"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
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
        this.props.actions.addMessageAction(socket, msg);
        this.setState({msg:''})
    }

    getData = allMsgs => {
        this.props.actions.updateMessageState(allMsgs);
    }

    changeData = () => socket.emit('initial_data')

    componentDidMount (){
        socket.emit("initial_data");
        socket.on("get_data", this.getData);
        socket.on("change_data", this.changeData);
    }

    componentWillUnmount() {
        socket.disconnect()
    }

    render() {
        
        return(
            <div className="chat-window">
                <div className="user-bar">
                
                </div>
                <div className="messages">
                    <div className="message-list">
                        {!this.props.chat.loading && this.props.chat.messages.map(msg => (
                            <Fragment>
                                {!this.props.auth.loading && this.props.auth.user._id === msg.user._id ? <div className="message msg-me">
                                    <h1>{msg.user.name}</h1>
                                    <p>{msg.text}</p>
                                </div> : <div className="message msg-you">
                                    <h1>{msg.user.name}</h1>
                                    <p>{msg.text}</p>
                                </div>}
                            </Fragment>
                        ))}
                    </div>
                    <div className="new-message">
                        <input type="text" onChange = {e => {this.setState({msg: e.target.value })}} value={this.state.msg} placeholder="New Message"></input> 
                        <button className="btn btn-dark" onClick={() => this.sendMessage(this.state.msg)}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

Chat.propTypes = {
    chat: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    chat: state.chat,
    auth: state.auth
})

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(chatActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)