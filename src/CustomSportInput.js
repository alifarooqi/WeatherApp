import React, { Component } from 'react';

export default class CustomSportInput extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleBtn = this.handleBtn.bind(this);
        this.state = {
            rainValue: 3,
            snowValue: 1
        }
    }

    /*Handles changes in slider*/
    handleChange(e) {
        if(e.target.id == "rain") {
            this.setState({rainValue: e.target.value});
        }
        else{
            this.setState({snowValue: e.target.value});
        }
    }

    //Handels when save or cancel button is clicked
    handleBtn(e){
        this.props.change(e);
    }

    render() {
        return (
            <div className="customPopup">
                <h3>Custom Sports</h3>
                <h4 className="subtitle">Select the maximum amount of each weather condition below, in which you can play your sport:</h4>
                <div>
                    <p>Rain: {this.state.rainValue} mm</p>
                    <input type="range" min="0" max="20" value={this.state.rainValue} className="slider" id="rain" onChange={this.handleChange} step="1"/>

                    <p>Snow: {this.state.snowValue} mm</p>
                    <input type="range" min="0" max="10" value={this.state.snowValue} className="slider" id="snow" onChange={this.handleChange} step="1"/>
                </div>
                <button className="saveBtn" onClick={this.handleBtn}>Save</button>
                <button onClick={this.handleBtn}>Cancel</button>
            </div>
        );
    }
}
