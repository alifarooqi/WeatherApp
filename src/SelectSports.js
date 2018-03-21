import React, { Component } from 'react';
import $ from 'jquery';

export default class SelectSports extends Component {
    constructor(props){
        super(props);
        this.selectSports = this.selectSports.bind(this);
        this.displayCustom = this.displayCustom.bind(this);
        this.state = {
            sports: "",
            loading: false,
        }
    }

    toggleDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
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
        $("#selectSports").html(e.target.innerHTML);
        this.toggleDropdown();
        this.props.changeSports(e.target.innerHTML);
    }

    displayCustom(){
        $(".customPopup").slideDown();
        this.toggleDropdown();
    }


    render() {
        return (
            <div className="dropdown">
                <button onClick={this.toggleDropdown} className="dropbtn"><span id="selectSports">Select sport</span>
                    <i className="fas fa-chevron-circle-down dropdownIcon"></i>
                </button>
                <div id="myDropdown" className="dropdown-content">
                    <input type="text" placeholder="Search for sports..." id="myInput" onKeyUp={this.filterFunction} />
                    <a href="javascript:void(0)" onClick={this.selectSports}>Football</a>
                    <a href="javascript:void(0)" onClick={this.selectSports}>Cricket</a>
                    <a href="javascript:void(0)" className="disabled">Basketball</a>
                    <a href="javascript:void(0)" className="disabled">Rugby</a>
                    <a href="javascript:void(0)" className="disabled">Field Hockey</a>
                    <a href="javascript:void(0)" className="disabled">Field Athletics</a>
                    <a href="javascript:void(0)" onClick={this.displayCustom}>Custom</a>
                </div>
            </div>
        );
    }
}
