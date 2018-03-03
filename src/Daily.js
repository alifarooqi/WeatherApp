import React, { Component } from 'react';
import $ from 'jquery';

export default class Daily extends Component {
    constructor(props){
        super(props);
        this.fetchWeatherData = this.fetchWeatherData.bind(this);
        this.parseResponse = this.parseResponse.bind(this);
        this.fetchWeatherData();
        this.state = {
            forecast: [],
            loading: true,
            unit: this.props.unit
        }
    }

    fetchWeatherData = () => {
        var url = "http://api.wunderground.com/api/4997088816c2242e/forecast10day/q/zmw:"+ this.props.zmw+".json";
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : this.parseResponse,
            error : function(req, err){ console.log('API call failed ' + err); }
        });
    }

    render() {
        if(this.state.loading){
            const Loading = require('react-loading-animation');
            return (
                <div className="loadingDaily">
                    <Loading/>
                </div>

            );
        }
        return (
            <div className="prediction">
                <h3 className="predictionTitle">Weekly Weather</h3>
                <div className="verticalScroll">
                    {this.state.forecast}
                </div>
            </div>
        );
    }

    parseResponse = (parsed_json) => {
        var data = parsed_json.forecast.simpleforecast.forecastday;
        var forecast = [];
        var unit = this.state.unit == 'C'? "celsius" : "fahrenheit";
        for (var i=1; i<data.length; i++){
            const temp = (
                <div className="hourly" key={i}>
                    <p>
                        <span className="time"> {data[i].date.weekday_short}</span><br/>
                        <span className="temp">{data[i].high[unit]} &deg;{this.state.unit}</span><br/>
                        Rain: {data[i].qpf_allday.mm} mm
                    </p>
                    <img src={data[i].icon_url} className="weatherIcon2" alt={data[i].icon} title={data[i].conditions} />
                </div>
            );
            forecast.push(temp);
        }
        this.setState({
            forecast: forecast,
            loading: false
        });
    }
}
