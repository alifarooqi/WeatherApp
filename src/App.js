import React, { Component } from 'react';
import Topnav from './Topnav';
import Sidenav from './Sidenav';
import Hourly from './Hourly';
import Daily from './Daily';
import './App.css';
import $ from 'jquery';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            city: "London",
            zmw: "00000.40.03779",
            temp: "",
            cond: "",
            icon: "",
            iconURL: "",
            unit: 'C',
            feelslike: "",
            rainToday: "",
            rainHour: "",
            visibility: "",
            windString: "",
            windSpeed: "",
            prediction: "hourly",
            loading: true
        }
        this.changeUnit = this.changeUnit.bind(this);
        this.displayDaily = this.displayDaily.bind(this);
        this.displayWeekly = this.displayWeekly.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.fetchWeatherData();
    }

    displayDaily(e){
        e.preventDefault();
        this.setState({prediction: "hourly"});
        this.closeNav();
    }
    displayWeekly(e){
        e.preventDefault();
        this.setState({prediction: "weekly"});
        this.closeNav();
    }

    fetchWeatherData = () => {
        var url = "http://api.wunderground.com/api/4997088816c2242e/conditions/q/zmw:"+ this.state.zmw+".json";
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : this.parseResponse,
            error : function(req, err){ console.log('API call failed ' + err); }
        });
    }
    changeUnit(){
      this.setState({
        unit: this.state.unit=='C' ? 'F' : 'C'
      });
      if (this.state.unit == 'F'){
        this.setState({
          temp: this.state.temp_c,
          feelslike : this.state.feelslike_c
        })
      }
      else {
          this.setState({
            temp: this.state.temp_f,
            feelslike : this.state.feelslike_f
          })
      }
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    changeLocation = (zmw) => {
        this.setState({
            zmw: zmw,
            loading: true
        }, this.fetchWeatherData);
        $(".searchResults").slideUp(500);
        $("#searchbox").val("");
    }

  render() {
      var unit2 = this.state.unit=='C' ? 'F':'C';
      let icon;
      if(this.state.icon){
        icon = <img src={this.state.iconURL} className="weatherIcon" alt={this.state.cond} title={this.state.cond}/>
      }
      let prediction;
      if (this.state.prediction == "hourly"){
        prediction = <Hourly unit={this.state.unit} zmw={this.state.zmw}/>
      }
      else{
        prediction = <Daily unit={this.state.unit} zmw={this.state.zmw} />
      }
      var d = new Date();
      d = d.toDateString();
      const Loading = require('react-loading-animation');
      let main;
      if(this.state.loading){
        main = (
            <div className="main2">
              <Loading/>
            </div>
        );
      }
      else{
        main = (
            <div className="main">
              <div className="box">
                <h1 className="location"> {this.state.city}</h1>
                <h1 className="date"> {d}</h1>
                <h1 className="temperature">
                    {icon}
                    {" " + this.state.temp} &deg;{this.state.unit}
                  <sup onClick={this.changeUnit}> &deg;{unit2}</sup>
                </h1>
                <h1 className="cond">{this.state.cond}</h1>
                <p className="rain"><b>Rain:</b> Today: {this.state.rainToday} mm
                  <br/><span>Next Hour: {this.state.rainHour} mm</span></p>
                <p className="other">
                  <b>Feels like:</b> {this.state.feelslike} &deg;{this.state.unit}<br/>
                  <b>Visibility:</b> {this.state.visibility} km<br/>
                    <b>Wind:</b><span className="wind"> {this.state.windString} ({this.state.windSpeed} kmph)</span>
                </p>
              </div>
                {prediction}
            </div>
        );
      }

      $(document).mouseup(function(e) {
          var container = $("#mySidenav");
          if (!container.is(e.target) && container.has(e.target).length === 0 && e.target.nodeName != "IMG") {
              document.getElementById("mySidenav").style.width = "0";
          }
      });

    return (
      <div className="App" ref="myRef">
        <Topnav changeTo={this.changeLocation}/>
        <Sidenav daily={this.displayDaily} weekly={this.displayWeekly} />
          {main}
      </div>
    );
  }

    parseResponse = (parsed_json) => {
        var city = parsed_json['current_observation']['display_location']['city'];
        var temp_c = parsed_json['current_observation']['temp_c'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        var conditions = parsed_json['current_observation']['weather'];
        var iconName = parsed_json['current_observation']['icon'];
        var iconURL = parsed_json['current_observation']['icon_url'];
        var feelslike_c = parsed_json['current_observation']['feelslike_c'];
        var feelslike_f = parsed_json['current_observation']['feelslike_f'];
        var rainD = parsed_json['current_observation']['precip_today_metric'];
        var rainH = parsed_json['current_observation']['precip_1hr_metric'];
        var visibility = parsed_json['current_observation']['visibility_km'];
        var windString = parsed_json['current_observation']['wind_string'];
        var windSpeed = parsed_json['current_observation']['wind_kph'];
        // set states for fields so they could be rendered later on
        if (this.refs.myRef) {
            this.setState({
                city: city,
                temp: temp_c,
                temp_c: temp_c,
                temp_f: temp_f,
                cond: conditions,
                icon: iconName,
                iconURL: iconURL,
                feelslike: feelslike_c,
                feelslike_c: feelslike_c,
                feelslike_f: feelslike_c,
                rainToday: rainD,
                rainHour: rainH,
                visibility: visibility,
                windString: windString,
                windSpeed: windSpeed,
                loading: false
            });
        }
    }
}

export default App;
