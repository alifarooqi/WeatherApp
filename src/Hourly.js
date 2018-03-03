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
            loading: true
        }
    }

    fetchWeatherData = () => {
        var url = "http://api.wunderground.com/api/4997088816c2242e/hourly/q/zmw:"+ this.props.zmw+".json";
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
                <h3 className="predictionTitle">Hourly Weather</h3>
                <div className="verticalScroll">
                    {this.state.forecast}
                </div>
            </div>
        );
    }

    parseResponse = (parsed_json) => {
        var forecast = [];
        var unit = this.props.unit == 'C'? "metric" : "english";
        console.log(parsed_json.hourly_forecast);
        for (var i=0; i < parsed_json.hourly_forecast.length; i++){
            const temp = (
                <div className="hourly" key={i}>
                    <p>
                        <span className="time"> {parsed_json.hourly_forecast[i].FCTTIME.hour_padded + ":" + parsed_json.hourly_forecast[i].FCTTIME.min}</span><br/>
                        <span className="temp">{parsed_json.hourly_forecast[i].temp[unit]} &deg;{this.props.unit}</span><br/>
                        Rain: {parsed_json.hourly_forecast[i].qpf.metric} mm
                    </p>
                    <img src={parsed_json.hourly_forecast[i].icon_url} className="weatherIcon2" alt={parsed_json.hourly_forecast[i].icon} title={parsed_json.hourly_forecast[i].condition} />
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
