		//OSM tiles attribution and URL
		var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
		var osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib = '&copy; ' + osmLink;

		//Carto tiles attribution and URL
		var cartoLink = '<a href="http://cartodb.com/attributions">CartoDB</a>';
		var cartoURL = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
		var cartoAttrib = '&copy; ' + osmLink + ' &copy; ' + cartoLink;

		//Stamen Toner tiles attribution and URL
		var stamenURL = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}';
		var stamenAttrib = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

		//Elevation tiles attribution and URL
		var ElevationLink = '<a href="https://www.openstreetmap.org/copyright">Elevation</a>';
		var ElevationURL = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
		var ElevationAttrib = '&copy; ' + ElevationLink;

		//Creation of map tiles
		var ElevationMap = L.tileLayer(ElevationURL, {attribution: ElevationAttrib});
		var osmMap = L.tileLayer(osmURL, {attribution: osmAttrib});
		var cartoMap = L.tileLayer(cartoURL, {attribution: cartoAttrib});
		var stamenMap = L.tileLayer(stamenURL,{
			attribution: stamenAttrib,
			subdomains: 'abcd',
			minZoom: 0,
			maxZoom: 20,
			ext: 'png'
		});

		//Map creation
		var map = L.map('map',{
			layers: [osmMap]
		}).setView([40.25631414421629, -98.36258169550734], 5);

		//Base layers definition and addition
		var baseLayers = {
			"OSM Mapnik": osmMap,
			"Carto DarkMatter": cartoMap,
			"Stamen Toner": stamenMap,
			"Elevation": ElevationMap
		};

		 //Add baseLayers to map as control layers
		 L.control.layers(baseLayers).addTo(map);

// Store API query variables
//var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
//var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
//var complaint = "&complaint_type=Rodent";
//var limit = "&$limit=10000";

// Assemble API query URL
var url = baseURL + date + complaint + limit;

// Grab the data with d3
d3.json(url, function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }

  }

  // Add our marker cluster layer to the map
  map.addLayer(markers);

});
