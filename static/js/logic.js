// GRANIM
var granimInstance = new Granim({
    element: '#canvas-complex',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    image : {
        source: 'images/bg.png',
		// source: 'images/aleinbg.jpeg',
		stretchMode: ['stretch-if-bigger', 'stretch-if-bigger'],
		position: ['center','bottom'],
        blendingMode: 'multiply'
    },
    states : {
        "default-state": {
            gradients: [
                ['#29323c', '#485563'],
                ['#FF6B6B', '#556270'],
                ['#80d3fe', '#7ea0c4'],
                ['#f0ab51', '#eceba3'],
				['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053']
            ],
            transitionSpeed: 7000
        }
    }
});

//OSM tiles attribution and URL
var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = '&copy; ' + osmLink;

//Carto tiles attribution and URL
var cartoLink = '<a href="http://cartodb.com/attributions">CartoDB</a>';
var cartoURL = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
var cartoAttrib = '&copy; ' + osmLink + ' &copy; ' + cartoLink;

//Elevation tiles attribution and URL
var ElevationLink = '<a href="https://www.openstreetmap.org/copyright">Elevation</a>';
var ElevationURL = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
var ElevationAttrib = '&copy; ' + ElevationLink;

//Creation of map tiles
var ElevationMap = L.tileLayer(ElevationURL, {attribution: ElevationAttrib});
var osmMap = L.tileLayer(osmURL, {attribution: osmAttrib});
var cartoMap = L.tileLayer(cartoURL, {attribution: cartoAttrib});

//Map creation
var map = L.map('map',{
	layers: [cartoMap]
}).setView([40.25631414421629, -98.36258169550734], 4);

//Base layers definition and addition
var baseLayers = {
	"Light Mode": osmMap,
	"Dark Mode": cartoMap,
	"Elevation": ElevationMap
};

//Add baseLayers to map as control layers
L.control.layers(baseLayers).addTo(map);
 
var bigfootIcon = L.icon({
	iconUrl: 'static/icons/squatchOutlineSM.png',
	iconSize:     [25, 25], 
	popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

var ufoIcon = L.icon({
	iconUrl: 'static/icons/alienOutlineSM.png',
	iconSize:     [25, 25],
	popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

var dogmanIcon = L.icon({
	iconUrl: 'static/icons/dogmanOutlineSM.png',
	iconSize:     [25, 25],
	popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

var hauntedIcon = L.icon({
	iconUrl: 'static/icons/hauntedOutlineSM.png',
	iconSize:     [25, 25],
	popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

// Assemble API query URL
var bigfoot = {
	url: 'Data/json/bigfoot.json',
	button: d3.select('#BFbutton'),
	dropdown: d3.select('#BFdropdown'),
	icon: bigfootIcon
};

var ufo = {
	url: 'Data/json/aliens-short.json',
	button: d3.select('#UFObutton'),
	dropdown: d3.select('#UFOdropdown'),
	icon: ufoIcon
};

var dogman = {
	url: 'Data/json/dogman.json',
	button: d3.select('#DMbutton'),
	dropdown: d3.select('#DMdropdown'),
	icon: dogmanIcon
};

var haunted = {
	url: 'Data/json/hauntedplaces.json',
	button: d3.select('#HPbutton'),
	dropdown: d3.select('#HPdropdown'),
	icon: hauntedIcon
};

var datasets = [bigfoot, ufo, dogman, haunted];

// var datasets = {
// 	'bigfoot': bigfoot,
// 	'ufo': ufo,
// 	'dogman': dogman,
// 	'haunted': haunted
// };

// Grab the Bigfoot data
// for (set = 0; set < datasets.length; set++) {
	// var dataset = datasets[set]
	d3.json(datasets[0].url, function(response) {
		addMarkers(response, datasets[0], 201);
		addToDropdown(response, datasets[0]);
		dropdownChange(response, datasets[0], 201);
		buttonToggle(datasets[0]);
		plotData(response);
		// datasets[0].button.on('click', buttonToggle(datasets[0]));
	});
	d3.json(datasets[1].url, function(response) {
		addMarkers(response, datasets[1], 231);
		addToDropdown(response, datasets[1]);
		dropdownChange(response, datasets[1], 231);
		buttonToggle(datasets[1]);
		plotData(response);
		// datasets[1].button.on('click', buttonToggle(datasets[1]));
	});
	d3.json(datasets[2].url, function(response) {
		addMarkers(response, datasets[2], 186);
		addToDropdown(response, datasets[2]);
		dropdownChange(response, datasets[2], 186);
		buttonToggle(datasets[2]);
		// datasets[2].button.on('click', buttonToggle(datasets[2]));
	});
	d3.json(datasets[3].url, function(response) {
		addMarkers(response, datasets[3], 171);
		addToDropdown(response, datasets[3]);
		dropdownChange(response, datasets[3], 171);
		buttonToggle(datasets[3]);
		// datasets[3].button.on('click', buttonToggle(datasets[3]));
	});
// };

function addMarkers(data, dataset, h) {
	// Create a new marker cluster group
	var markers = L.markerClusterGroup({maxClusterRadius: 65, disableClusteringAtZoom: 9});
	var popup = '';

	// Loop through data
	for (var i = 0; i < Object.keys(data).length; i++) {
		// Set the data location property to a variable
		var lat = data[i].latitude;
		var lon = data[i].longitude;
		var location = [lat, lon];
		var value = i;

		// Check for location property
		if (location) {
			if (dataset.icon == bigfootIcon) {
				popup = `${data[i].date}<br/>
							${data[i].county}, ${data[i].state}<br/><br/>
							${data[i].title}`;
			} else if (dataset.icon == ufoIcon) {
				popup = `${data[i].date}<br/>
							${data[i].city}, ${data[i].state}<br/><br/>
							${data[i].title}`;
			} else if (dataset.icon == dogmanIcon) {
				popup = `${data[i].date}<br/>
							${data[i].location}, ${data[i].state_abbrev}`;
			} else if (dataset.icon == hauntedIcon) {
				popup = `${data[i].location}<br/>
							${data[i].city}, ${data[i].state_abbrev}`
			};
		};

		// Add a new marker to the cluster group and bind a pop-up
		var marker = L.marker(location, {icon: dataset.icon}).bindPopup(popup).on('click', function() {
			// onToggle(dataset);
			// console.log(value);
			// onChange(data, dataset, h, value)
		});

		marker.addTo(markers);
	};

	// Add our marker cluster layer to the map
	map.addLayer(markers);
};