import React, { Component } from 'react';
import $ from 'jquery';

export default class Daily extends Component {
    constructor(props){
        super(props);
        this.fetchWeatherData = this.fetchWeatherData.bind(this);
        this.parseResponse = this.parseResponse.bind(this);
        this.state = {
            forecast: [],
            loading: true,
            unit: this.props.unit,
            mySports: this.props.mySports,
            sportsConditions: this.props.sportsConditions
        }
        this.fetchWeatherData();
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

    scrollLeft(){
        var leftPos = $('.verticalScroll').scrollLeft();
        $(".verticalScroll").animate({scrollLeft: leftPos - 93}, 500);
        console.log("Scrolling left");
    }
    scrollRight(){
        var leftPos = $('.verticalScroll').scrollLeft();
        $(".verticalScroll").animate({scrollLeft: leftPos + 93}, 500);
        console.log("Scrolling right");
    }

    render() {
        //See if the unit has changed
        if (this.state.unit != this.props.unit){
            this.setState({unit: this.props.unit});
            this.fetchWeatherData();
        }
        //Check if My Sports has been updated
        if (this.state.mySports != this.props.mySports){
            this.setState({
                mySports: this.props.mySports,
                sportsConditions: this.props.sportsConditions
            }, this.fetchWeatherData);
        }
        //Check if the data has parsed successfully
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
                <h3 className="predictionTitle">Hourly Weather <span className="changePrediction" onClick={this.props.change}>Weekly Weather</span> </h3>
                <div className="leftArrow" onClick={this.scrollLeft}><i className="fas fa-chevron-circle-left"></i></div>
                <div className="rightArrow" onClick={this.scrollRight}><i className="fas fa-chevron-circle-right"></i></div>
                <div className="verticalScroll">
                    {this.state.forecast}
                </div>
            </div>
        );
    }

    parseResponse = (parsed_json) => {
        var forecast = [];
        var unit = this.props.unit == 'C'? "metric" : "english";
        var backgroundColor = {};

        for (var i=0; i < parsed_json.hourly_forecast.length; i++){
            //Check if any sports is selected
            if (this.state.mySports != null){
                var cond = this.state.sportsConditions[this.state.mySports];
                var properties = Object.getOwnPropertyNames(cond);
                var canPlay = true;
                for (var j=0; j<properties.length-1 && canPlay; j++){
                    var currentCond = parseFloat(parsed_json.hourly_forecast[i][properties[j]]["metric"]);
                    if (currentCond < cond[properties[j]][0] || currentCond > cond[properties[j]][1]){ //If current condition lies outside the normal range of the sports.
                        canPlay = false;
                        break;
                    }
                }
                if (canPlay){
                    backgroundColor = {backgroundColor: 'rgba(0, 132, 79,0.6)', color: 'white'};
                }
                else{
                    backgroundColor = {backgroundColor: 'rgba(260,0,0,0.6)', color: 'white'};
                }
            }
            const temp = (
                <div className="hourly" key={i} style={backgroundColor}>
                    <p>
                        <span className="time"> {parsed_json.hourly_forecast[i].FCTTIME.hour_padded + ":" + parsed_json.hourly_forecast[i].FCTTIME.min}</span><br/>
                        <span className="temp">{parsed_json.hourly_forecast[i].temp[unit]} &deg;{this.props.unit}</span><br/>
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
