import React, { Component } from 'react';
import SelectSports from './SelectSports';
import './App.css';
import $ from 'jquery';

export default class Topnav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            querry: "",
            resultsName: [],
            resultsZMW: []
        }
        this.changeLocTO = this.changeLocTO.bind(this);
        this.changeSports = this.changeSports.bind(this);
    }

    fetchLocation = (querry) => {
        var url = "http://autocomplete.wunderground.com/aq?query="+ querry;
        console.log("Fetching Location for " + this.state.querry);
        $.ajax({
            url: url,
            dataType: "json",
            success : this.parseResponse,
            error : function(req, err){ console.log('API call failed ' + err); }
        });
    }

    parseResponse = (parsed_json) => {
        console.log(parsed_json['RESULTS']);
        if (parsed_json['RESULTS'].length>0) {
            var names = [];
            var zmws = [];
            for (var i = 0; i < parsed_json['RESULTS'].length; i++) {
                //TODO Add onClick function!
                names.push(<h3 className="result" id={i} key={i} onClick={this.changeLocTO}>{parsed_json['RESULTS'][i]["name"]}</h3>);
                zmws.push(parsed_json['RESULTS'][i]["zmw"]);
            }
            this.setState({
                resultsName: names,
                resultsZMW: zmws
            });
        }
        else{
            this.setState({
                resultsName: <h3 className="noResult">No matching city found</h3>
            });
        }
        $(".searchResults").slideDown();
    }

    changeLocTO(e){
        var i = e.target.id;
        this.props.changeTo(this.state.resultsZMW[i]);
        this.setState({querry: ""})
    }

    changeSports(sports){
        this.props.changeSports(sports);
        //Added Animation to confirm change
        $('html, body').animate({
            scrollTop: $(".prediction").offset().top
        }, 1500);
        for (var iter = 0; iter < 4 ; iter++) {
            $(".prediction").animate({
                left: ((iter % 2 == 0 ? 10 : -10))
            }, 100);
        }
        $(".prediction").animate({ left: 0 }, 100);
    }

    search = () => {
        setTimeout(function(){
            var querry = document.getElementById("searchbox").value;
            if (querry.length>0 && querry != this.state.querry) {
                this.setState({querry: querry});
                this.fetchLocation(querry);
            }
            else if (querry.length==0) {
                $(".searchResults").slideUp();
            }
        }.bind(this),1000);
    }

        render() {
        return (
            <div className="topnav">
                <SelectSports changeSports={this.changeSports}/>
                <input className="changeLoc" placeholder= "Change Location" onKeyUp={this.search} id="searchbox"/>
                <div className="searchResults">
                    {this.state.resultsName}
                </div>
            </div>
        );
    }
}
