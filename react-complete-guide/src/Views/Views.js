import React, { Component } from 'react';
import topicMgmtInstance from '../axios';
import './Views.css';

class Views extends Component {
    render() {

        return (
            // <div style={
            //     { 'border': 'dotted','padding' : '5 5 5 5' }
            // }>
            //     {this.props.title}
            // </div>
            <div className="border"> {this.props.title}</div>
        );

    }
}


export default Views;