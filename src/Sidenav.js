import React, { Component } from 'react';

export default class Sidenav extends Component {
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                <a href="javascript:void(0)" onClick={this.props.daily}>Daily</a>
                <a href="javascript:void(0)" onClick={this.props.weekly}>Weekly</a>
                <a href="javascript:void(0)">My Sports</a>
            </div>
        );
    }
}
