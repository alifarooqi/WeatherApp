import React, { Component } from 'react';
import Topnav from './Topnav';
import Hourly from './Hourly';
import Daily from './Daily';
import CustomSportInput from './CustomSportInput';
import './App.css';
import $ from 'jquery';

/*
    The main Weather app with all its components.
 */

class App extends Component {
    constructor(props){
        super(props);
        this.state = { //Initializing state
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
            loading: true,
            mySports: null,
            sportsConditions: { //Specifies the lower and upper limit of the conditions in which a sports can be played normally. Null shows that a value does not have any effect on sports. Attribute names match the ones provided by the API.
                Football: {
                    qpf: [0, 8], //Rain in mm
                    snow: [0, 1], //Snow in mm
                    background: "http://localhost:3000/static/media/Football.c1fc68cb.jpg" //Source location of background image when this sport is selected
                },
                Cricket : {
                    qpf: [0,4],
                    snow: [0,0],
                    background: "http://localhost:3000/static/media/Cricket.8efebacb.jpg"
                },
                Custom : {
                    qpf: [0,0],
                    snow: [0,0],
                    background: "http://localhost:3000/static/media/custom.074c3489.jpg"
                }
            },
        }
        this.changeUnit = this.changeUnit.bind(this);
        this.displayDaily = this.displayDaily.bind(this);
        this.displayWeekly = this.displayWeekly.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeSports = this.changeSports.bind(this);
        this.selectCustom = this.selectCustom.bind(this);
        this.fetchWeatherData();
    }
    /*
        Displays th eDaily and Weekly tabs respectively
     */
    displayDaily(e){
        e.preventDefault();
        this.setState({prediction: "hourly"});
    }
    displayWeekly(e){
        e.preventDefault();
        this.setState({prediction: "weekly"});
    }

    /*
        Calls API
     */
    fetchWeatherData = () => {
        var url = "http://api.wunderground.com/api/4997088816c2242e/conditions/q/zmw:"+ this.state.zmw+".json";
        $.ajax({
            url: url,
            dataType: "jsonp",
            success : this.parseResponse,
            error : function(req, err){ console.log('API call failed ' + err); }
        });
    }

    /*
        Handles the change in units
     */
    changeUnit(){
      if (this.state.unit == 'F'){
        this.setState({
          temp: this.state.temp_c,
          feelslike : this.state.feelslike_c,
          unit: 'C'
        })
      }
      else {
          this.setState({
            temp: this.state.temp_f,
            feelslike : this.state.feelslike_f,
            unit: 'F'
          })
      }
    }

    /*
        Changes the zmw code (the code used by API to show weather of certain location), so that you can change the location.
     */
    changeLocation = (zmw) => {
        this.setState({
            zmw: zmw,
            loading: true
        }, this.fetchWeatherData);
        $(".searchResults").slideUp(500);
        $("#searchbox").val("");
    }

    /*
        Handles when 'My Sports' is selected or changed
     */
    changeSports(sports){
        this.setState({mySports: sports});
    }

    /*
        Handles when a Custom sports is selected
     */
    selectCustom(e){
        if(e.target.innerHTML == "Save"){
            var rain = document.getElementById("rain").value;
            var snow = document.getElementById("snow").value;
            console.log(rain + " " + snow);
            var sc = this.state.sportsConditions;
            sc.Custom.qpf[1] = rain;
            sc.Custom.snow[1] = snow;
            this.setState({sportsConditions: sc});
            $("#selectSports").html("Custom");
            //Animates to confirm the changes
            $('html, body').animate({
                scrollTop: $(".prediction").offset().top
            }, 1500);
            for (var iter = 0; iter < 4 ; iter++) {
                $(".prediction").animate({
                    left: ((iter % 2 == 0 ? 10 : -10))
                }, 100);
            }
            $(".prediction").animate({ left: 0 }, 100);

            this.changeSports("Custom");
        }
        $(".customPopup").slideUp();
    }

  render() {
      var unit2 = this.state.unit=='C' ? 'F':'C';
      let icon;
      if(this.state.icon){
        icon = <img src={this.state.iconURL} className="weatherIcon" alt={this.state.cond} title={this.state.cond}/>
      }
      let prediction;
      if (this.state.prediction == "hourly"){
        prediction = <Hourly unit={this.state.unit} zmw={this.state.zmw} change={this.displayWeekly} mySports={this.state.mySports} sportsConditions={this.state.sportsConditions}/>
      }
      else if (this.state.prediction == "weekly"){
        prediction = <Daily unit={this.state.unit} zmw={this.state.zmw} change={this.displayDaily} mySports={this.state.mySports} sportsConditions={this.state.sportsConditions}/>
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
      var backgroundImage = {};
      if(this.state.mySports != null){
          backgroundImage = {backgroundImage: 'url(' + this.state.sportsConditions[this.state.mySports].background + ')'}
      }
    return (
      <div className="App" ref="myRef" style={backgroundImage}>
        <CustomSportInput change={this.selectCustom}/>
        <Topnav changeTo={this.changeLocation} changeSports={this.changeSports}/>
          {main}
      </div>
    );
  }

  /*
    Parses the response from the API and displays it on the main app.
   */
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
