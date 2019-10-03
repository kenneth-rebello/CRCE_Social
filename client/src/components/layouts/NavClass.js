import React, { Component } from 'react'
import Navbar from './Navbar'
import io from "socket.io-client"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as notifActions from '../../actions/notif'

let socket;

class NavClass extends Component {

    constructor({props})
    {
        super(props)

        socket = io.connect("http://localhost:5000");
        this.getData = this.getData.bind(this)
    }

    getData = x => {
        this.props.actions.getUnseenNotifs();
    }

    componentDidMount(){
        this.props.actions.getUnseenNotifs();
        socket.on('get_data', this.getData)
    }
    
    render() {
        return (
            <Navbar/>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(notifActions, dispatch)}
}

const mapStateToProps = state =>({
    notif: state.notif
})

export default connect(mapStateToProps, mapDispatchToProps)(NavClass)