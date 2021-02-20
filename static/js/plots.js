var bfURL = "Data/json/bigfoot.json";
var ufoURL = 'Data/json/aliens-short.json';

// set arrays for graphing
var bfStates = [];
var bfMoon = [];
var ufoStates = [];
var ufoShape = [];

//import BF and UFO data
function plotData(dataset) {
	for (i = 0; i < dataset.length; i++) {
 		if (dataset == datasets[0]) {
			bfStates[i] = dataset[i].state;
			bfMoon[i] = dataset[i].moon_phase;
		}
		else if (dataset == datasets[1]) {
			ufoStates[i] = dataset[i].state;
			ufoShape[i] = dataset[i].shape;
		};

		// for plot testing
		// var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
		// var test = []
		// for (i = 0; i < 3797; i++) {
		// 	test[i] = _.sample(states);
		// }

		bfMoon = bfMoon.sort();
		bfStates = bfStates.sort();
		ufoStates = ufoStates.sort();

		var trace1 = {
			// y: test,
			y: bfStates,
			name: 'Bigfoot',
			type: 'histogram',
			marker: {color: 'orange'},
			// legendgroup: 'sightings',
		};

		var trace2 = {
			// y: test,
			y: ufoStates,
			name: 'UFOs',
			type: 'histogram',
			marker: {color: 'green'},
			// legendgroup: 'sightings',
		};

		var trace3 = {
			y: bfMoon,
			name: "BF By Moon Phase",
			type: 'histogram',
			marker: {color: 'white'},
			visible: 'legendonly',
		};

		var trace4 = {
			y: ufoShape,
			name: "UFOs By Shape",
			type: 'histogram',
			marker: {color: 'white'},
			visible: 'legendonly',
		};

		var layout = {
			plot_bgcolor: 'rgb(38,38,38)',
			paper_bgcolor: 'rgb(38,38,38)',
			margin: {
				l: 55,
				r: 55,
				t: 55,
				b: 80,
			},
			
			title: {
				text: 'Sightings per State',
			},

			yaxis: {
				tickfont: {
					size: 10,
				}
			},
			
			xaxis: {
				title: 'Number of sightings',
				titlefont: {
					size: 16,
				},
				tickfont: {
					size: 14,
				}
			},

			legend: {
				x: .5,
				y: 1.0,
			},
			
			
			// barmode: 'stack',
			bargap: 0.2,
			bargroupgap: 0.0,
			font: {
				color: 'rgb(180, 180, 180)',
				family: 'monospace',
			}
		};

		var data = [trace1, trace2, trace3, trace4];

		Plotly.plot('vis1', data, layout, {showTips: false})
	};
};
