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

// for plot testing
var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
var test = []
for (i = 0; i < 3797; i++) {
	
	test[i] = _.sample(states);
}
// ----------------

var trace1 = {
	y: test,
	// y: bfStates,
	name: 'Bigfoot',
	type: 'histogram',
	color: 'brown'
};

var layoutMargin = 100;

var layout = {
	title: 'Bigfoot Sightings by State',
	xaxis: {title: 'Sightings'},
	margin: {
		l: 110,
		r: 0,
		b: 60,
		t: 60,
	}
};

var data = [trace1];

Plotly.plot('vis1', data, layout)