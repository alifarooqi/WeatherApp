import React, { Component } from 'react';

export default class MySports extends Component {
    render() {

    	var sports={

    	    football:{
    		wind_mph:0,
    		precip_today_metric:2,
    		temp_c:0,
    		//weather:["sunny","cloudy","rain"],
		    },

		    snowboard:{
			wind_mph:0,
			precip_today_metric:0,
    		temp_c:-30,
    		//weather:["sunny","cloudy","rain","snow"],
    	    }

    	};

    	var good_to_play=true;

        var sport_name = document.getElementById("sport_name").value;

    	var attributes = sports[sport_name].getOwnPropertyNames();
        for (var i=0; i<attributes.length; i++){
            if (sports[sport_name][attributes[i]] > current[attributes[i]]) {
            	good_to_play=false;
                break;
            }
        }

        let play;
        if(good_to_play){
        	play = (<p>
        	The weather wont be a problem for your sport. Go play!
        	</p>);
        }
        else {
        	play = (
        		<p>
        The weather isnt good for your sport right now.
        </p>);
        }
        



        return (
            <div>
                
                <form action="">
                    <p> What is your sport: 
                        <input type="text" name="sport_name" id="sport_name" size="25"/>
                    </p>
                    {play}
                </form>

            </div>
        );
    }
}