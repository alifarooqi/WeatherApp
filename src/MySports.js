import React, { Component } from 'react';
import $ from 'jquery';

export default class MySports extends Component {
    constructor(props){
        super(props);
        this.fetchWeatherData = this.fetchWeatherData.bind(this);
        this.parseResponse = this.parseResponse.bind(this);
        this.selectSports = this.selectSports.bind(this);
        this.selectDay = this.selectDay.bind(this);
        this.selectTime = this.selectTime.bind(this);
        this.state = {
            sports: "",
            loading: false,
            unit: this.props.unit
        }
        this.fetchWeatherData;
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

    parseResponse = (parsed_json) => {
        var data = parsed_json.forecast.simpleforecast.forecastday;
        var time = [];
        var temperature = [];
        var rain = [];
        var snow = [];
        var wind = [];
        for (var i=0; i < parsed_json.hourly_forecast.length; i++){
            time.push(parsed_json.hourly_forecast[i].FCTTIME.hour_padded + ":" + parsed_json.hourly_forecast[i].FCTTIME.min);
            temperature.push(parseFloat(parsed_json.hourly_forecast[i].temp["celsius"]));
            rain.push(parseFloat(parsed_json.hourly_forecast[i].qpf.metric));
            snow.push(parseFloat(parsed_json.hourly_forecast[i].snow.metric));
            wind.push(parseFloat(parsed_json.hourly_forecast[i].wspd.metric));
        }
        var forecast = {
            time: time,
            temperature: temperature,
            rain: rain,
            snow: snow
        }
        this.setState({
            forecast: forecast,
            loading: false
        });
    }

    toggleDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    toggleDropdown2() {
        document.getElementById("myDropdown2").classList.toggle("show");
    }
    toggleDropdown3() {
        document.getElementById("myDropdown3").classList.toggle("show");
    }

    filterFunction() {
        var input, filter, ul, li, a, i, div;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
            if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }

    selectSports(e) {
        this.setState({sports: e.target.innerHTML});
        $("#selectSports").html(e.target.innerHTML) ;
        $("#dayDD").slideDown();
        this.toggleDropdown();
    }
    selectDay(e) {
        this.setState({day: e.target.innerHTML});
        $("#selectDay").html(e.target.innerHTML);
        $("#timeDD").slideDown();
        this.toggleDropdown2();
    }
    selectTime(e) {
        this.setState({time: e.target.innerHTML});
        $("#selectTime").html(e.target.innerHTML);
        $("#confirmBtn").slideDown();
        this.toggleDropdown3();
    }



    render() {
        return (
            <div className="prediction">
                <h3 className="predictionTitle">My Sports</h3>
                <div className="dropdown">
                    <button onClick={this.toggleDropdown} className="dropbtn"><span id="selectSports">Select your sports</span>
                    <img className="dropdownIcon" src={require("./img/dropdown.png")} />
                    </button>
                    <div id="myDropdown" className="dropdown-content">
                        <input type="text" placeholder="Search for sports..." id="myInput" onKeyUp={this.filterFunction} />
                            <a href="javascript:void(0)" onClick={this.selectSports}>Football</a>
                            <a href="javascript:void(0)" onClick={this.selectSports}>Cricket</a>
                            <a href="javascript:void(0)" onClick={this.selectSports}>Basketball</a>
                            <a href="javascript:void(0)" onClick={this.selectSports}>American Football</a>
                            <a href="javascript:void(0)" onClick={this.selectSports}>Field Hockey</a>
                            <a href="javascript:void(0)" onClick={this.selectSports}>Field Athletics</a>
                            <a href="javascript:void(0)" onClick={this.selectSports}>Custom</a>
                    </div>
                </div>
                <div className="dropdown" id="dayDD">
                    <button onClick={this.toggleDropdown2} className="dropbtn"><span id="selectDay">Select day</span>
                        <img className="dropdownIcon" src={require("./img/dropdown.png")} />
                    </button>
                    <div id="myDropdown2" className="dropdown-content">
                        <a href="javascript:void(0)" onClick={this.selectDay}>Today</a>
                        <a href="javascript:void(0)" onClick={this.selectDay}>Tomorrow</a>
                    </div>
                </div>
                <div className="dropdown" id="timeDD">
                    <button onClick={this.toggleDropdown3} className="dropbtn"><span id="selectTime">Select time</span>
                        <img className="dropdownIcon" src={require("./img/dropdown.png")} />
                    </button>
                    <div id="myDropdown3" className="dropdown-content">
                        <a href="javascript:void(0)" onClick={this.selectTime}>16:00</a>
                    </div>
                </div>
                <button id="confirmBtn">Confirm</button>
            </div>
        );
    }
}
