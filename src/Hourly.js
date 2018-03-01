import React, { Component } from 'react';

export default class Hourly extends Component {
    render() {
        var d = new Date();
        return (
            <div className="prediction">
                <h3 className="predictionTitle">Hourly Weather</h3>
                <div className="verticalScroll">
                    <div className="hourly">
                        <p>
                            <span className="time"> {(d.getHours()+1)%24}:00</span><br/>
                            <span className="temp">{this.props.temp} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + this.props.icon + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {(d.getHours()+2)%24}:00</span><br/>
                            <span className="temp">{parseInt(this.props.temp)-1} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + this.props.icon + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {(d.getHours()+3)%24}:00</span><br/>
                            <span className="temp">{parseInt(this.props.temp)-1} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + this.props.icon + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {(d.getHours()+4)%24}:00</span><br/>
                            <span className="temp">{parseInt(this.props.temp)-1} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + this.props.icon + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {(d.getHours()+5)%24}:00</span><br/>
                            <span className="temp">{this.props.temp} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + this.props.icon + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {(d.getHours()+6)%24}:00</span><br/>
                            <span className="temp">{this.props.temp} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + this.props.icon + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {(d.getHours()+7)%24}:00</span><br/>
                            <span className="temp">{parseInt(this.props.temp)+1} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + this.props.icon + ".gif"} className="weatherIcon2"/>
                    </div>
                </div>
            </div>
        );
    }
}
