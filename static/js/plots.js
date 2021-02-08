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
	y: ['MN', 'WI', 'AZ', 'MN', 'FL', 'FL', 'FL', 'MN', 'CO'],
	// y: bfStates,
	name: 'Bigfoot',
	type: 'histogram',
	color: 'brown'
};

var layoutMargin = 60;

var layout = {
	title: 'Bigfoot Sightings by State',
	xaxis: {title: 'Sightings'},
	yaxis: {title: 'State'},
	margin: {
		l: layoutMargin,
		r: layoutMargin,
		b: layoutMargin,
		t: layoutMargin,
	}
};

var data = [trace1];

Plotly.plot('vis1', data, layout)