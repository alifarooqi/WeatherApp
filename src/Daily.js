import React, { Component } from 'react';

export default class Daily extends Component {
    render() {
        var date = new Date();
        var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var icons = [
            'chanceflurries',
            'chancerain',
            'chancesleet',
            'chancesnow',
            'chancetstorms',
            'clear',
            'cloudy',
            'flurries',
            'fog',
            'hazy',
            'mostlycloudy',
            'mostlysunny',
            'partlycloudy',
            'partlysunny',
            'sleet',
            'rain',
            'sleet',
            'snow',
            'sunny',
            'tstorms',
            'cloudy',
            'partlycloudy'
        ];
        var a = Math.floor(Math.random()*icons.length);
        var b = Math.floor(Math.random()*icons.length);
        var c = Math.floor(Math.random()*icons.length);
        var d = Math.floor(Math.random()*icons.length);
        return (
            <div className="prediction">
                <h3 className="predictionTitle">Weekly Weather</h3>
                <div className="verticalScroll">
                    <div className="hourly">
                        <p>
                            <span className="time"> {days[(date.getDay()+1)%7]}</span><br/>
                            <span className="temp">{this.props.temp} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + icons[a] + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {days[(date.getDay()+2)%7]}</span><br/>
                            <span className="temp">{parseInt(this.props.temp)-1} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + icons[a] + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {days[(date.getDay()+3)%7]}</span><br/>
                            <span className="temp">{parseInt(this.props.temp)-1} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + icons[b] + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {days[(date.getDay()+4)%7]}</span><br/>
                            <span className="temp">{parseInt(this.props.temp)-1} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + icons[c] + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {days[(date.getDay()+5)%7]}</span><br/>
                            <span className="temp">{this.props.temp} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + icons[c] + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {days[(date.getDay()+6)%7]}</span><br/>
                            <span className="temp">{this.props.temp} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + icons[d] + ".gif"} className="weatherIcon2"/>
                    </div>
                    <div className="hourly">
                        <p>
                            <span className="time"> {days[(date.getDay()+7)%7]}</span><br/>
                            <span className="temp">{parseInt(this.props.temp)+1} &deg;{this.props.unit}</span><br/>
                            Rain: {this.props.rain} mm
                        </p>
                        <img src={"https://icons.wxug.com/i/c/k/" + icons[d] + ".gif"} className="weatherIcon2"/>
                    </div>
                </div>
            </div>
        );
    }
}
