var bfURL = "Data/json/bigfoot.json";
var ufoURL = 'Data/json/aliens-short.json';
// set arrays for graphing
var bfStates = [];
var bfMoon = [];
var ufoStates = [];
var ufoShape = [];

//import BF and UFO data
d3.json(bfURL, function(bfData) {
	d3.json(ufoURL, function(ufoData) {
 		for (i = 0; i < Object.keys(bfData).length; i++) {
			bfStates[i] = bfData[i].state;
			bfMoon[i] = bfData[i].moon_phase;
		}
		for (i = 0; i < Object.keys(ufoData).length; i++) {
			ufoStates[i] = ufoData[i].state;
			ufoShape[i] = ufoData[i].shape;
		}
// 	})
// });
	
		// for plot testing
		// var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
		// var test = []
		// for (i = 0; i < 3797; i++) {
			
		// 	test[i] = _.sample(states);
		// }
		// ----------------	
		bfMoon = bfMoon.sort();
		bfStates = bfStates.sort();
		ufoStates = ufoStates.sort();

		var trace1 = {
			// y: test,
			y: bfStates,
			name: 'Bigfoot',
			type: 'histogram',
			marker: {color: 'orange'},
		};

		var trace2 = {
			// y: test,
			y: ufoStates,
			name: 'UFOs',
			type: 'histogram',
			marker: {color: 'green'},
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
				l: 75,
				r: 20,
				t: 55,
				b: 70,
			},
			
			title: {
				text: 'Sightings per State',
				color: 'rgb(180, 180, 180)',
			},
			yaxis: {tickfont: {
				size: 14,
				color: 'rgb(180, 180, 180)'
			}},
			
			xaxis: {
			title: 'Number of sightings',
			titlefont: {
				size: 16,
				color: 'rgb(180, 180, 180)'
			},
			
			tickfont: {
				size: 14,
				color: 'rgb(180, 180, 180)'
			}
			},
			
			legend: {
			x: .5,
			y: 1.0,
			color: 'rgb(180, 180, 180)',
			bgcolor: 'rgba(255, 255, 255, 0)',
			bordercolor: 'rgba(255, 255, 255, 0)'
			},
			
			barmode: 'group',
			bargap: 0.15,
			bargroupgap: 0.1,
			font: {color: 'rgb(180, 180, 180)'}
		};
		var data = [trace1, trace2, trace3, trace4];

		Plotly.plot('vis1', data, layout)
	})
});
