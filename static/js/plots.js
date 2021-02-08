var bfURL = "Data/json/bigfoot.json";
var ufoURL = 'Data/json/aliens-short.json';

// set arrays for graphing
var bfStates = [];
var ufoStates = [];

//import BF and UFO data
d3.json(bfURL, function(bfData) {
	d3.json(ufoURL, function(ufoData) {
 		for (i = 0; i < Object.keys(bfData).length; i++) {
			bfStates[i] = bfData[i].state;			  
		}
		for (i = 0; i < Object.keys(ufoData).length; i++) {
			ufoStates[i] = ufoData[i].state;
		}
	})
});

var trace1 = {
    // y: test,
    y: bfStates,
	name: 'Bigfoot',
	color: 'rgb(180, 180, 180, .8)',
    type: 'histogram',
    marker: {color: 'darkorange'},
};

var trace2 = {
	  // y: test,
	  y: ufoStates,
	  name: 'Alien',
	  type: 'histogram',
	  marker: {color: 'rgba(110, 204, 57, 0.6)'},

};
var data = [trace1, trace2];

var layoutMargin = 100;

var layout = {
	title: 'Sightings per State',
	font: {color: 'rgb(180, 180, 180)'},
	plot_bgcolor:'rgb(38, 38, 38)',
	paper_bgcolor:'rgb(38, 38, 38)',

	yaxis: {tickfont: {
        size: 14,
        
      }},
    
    xaxis: {
      title: 'Sightings',
      titlefont: {
        size: 16,
        
      },
      tickfont: {
        size: 14,
       
      }
    },
    legend: {
      x: 0,
      y: 1.0,
      bgcolor: 'rgba(255, 255, 255, 0)',
      bordercolor: 'rgba(255, 255, 255, 0)'
    },
    barmode: 'group',
    bargap: 0.15,
	bargroupgap: 0.1
	
  };
//   Plotly.plot('vis1', data, layout)
