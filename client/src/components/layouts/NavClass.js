import React, { Component } from 'react'
import './styles/nav.css'
import Navbar from './Navbar'
import io from "socket.io-client"
import {connect} from 'react-redux'

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
        socket.on('get_data', this.getData)
    }
    
    render() {
        return (
            <Navbar/>
        )
    }
}

const mapStateToProps = state =>({
    notif: state.notif
})

export default connect(mapStateToProps)(NavClass)