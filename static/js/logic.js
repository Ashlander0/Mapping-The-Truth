

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
                ['#f0ab51', '#eceba3']
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
 

var AlienIcon = L.icon({
	iconUrl: 'static/icons/alienOutlineSM.png',
	//shadowUrl: 'leaf-shadow.png',
	iconSize:     [25, 25], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	//iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});
 

var UfoIcon = L.icon({
	iconUrl: '../../images/ufoIcon.png',
	//shadowUrl: 'leaf-shadow.png',
	iconSize:     [25, 25], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	//iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

var squatchIcon = L.icon({
	iconUrl: 'static/icons/squatchOutlineSM.png',
	//shadowUrl: 'leaf-shadow.png',
	iconSize:     [25, 25], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	//iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
});

var customOptions = {
	'maxWidth': '500',
	'minWidth': '320',
	'maxHeight': '500',
	'className' : 'custom'
}

// Assemble API query URL
var bigfootURL = '../../Data/json/bigfoot.json';
var alienURL = '../../Data/json/aliens-short.json';
var dogmanURL = '../../Data/json/dogman.json';
var hauntedURL = '../../Data/json/hauntedplaces.json';

// Grab the Bigfoot data
d3.json(bigfootURL, function(response) {
	addMarkers(response, squatchIcon);
	addToBFDropdown(response);
});

// Grab Alien data
d3.json(alienURL, function(response) {
	addMarkers(response, AlienIcon);
	addToADropdown(response);
});

function addMarkers(data, iconVar) {
	// Create a new marker cluster group
	var markers = L.markerClusterGroup({maxClusterRadius: 65, disableClusteringAtZoom: 9});

	// Loop through data
	for (var i = 0; i < Object.keys(data).length; i++) {

		// Set the data location property to a variable

		var lat = data[i].latitude;
		var lon = data[i].longitude;
		var location = [lat, lon];

		// Check for location property
		if (location) {
			var popup = data[i].date +
						'<br/><br/>' +
						data[i].title;

			// Add a new marker to the cluster group and bind a pop-up
			markers.addLayer(L.marker(location,{icon: iconVar})
			.bindPopup(popup));
		}

	}

	// Add our marker cluster layer to the map
	map.addLayer(markers);
};

// FOR PLOTS ========================= //
// d3.json('Data/json/Bigfoot.json').then(function(data) {
// 	var states = Object.keys(data).map(data => data.state);
// 	console.log(states);
// })
