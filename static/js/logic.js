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

		 var AlienIcon = L.icon({
			// iconUrl: '/Users/jbeachy/Box/BootcampHomework/18-Project2/Project-Two-The-Sasquatch-affair-/images/alien.rtf',
			iconUrl: '../../images/alienIcon.png',
			//shadowUrl: 'leaf-shadow.png',
			iconSize:     [25, 25], // size of the icon
			//shadowSize:   [50, 64], // size of the shadow
			//iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
			//shadowAnchor: [4, 62],  // the same for the shadow
			popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
			L.marker([47.21095077735268, -123.50078044732939], {icon: AlienIcon}).addTo(map);

		var SasquatIcon = L.icon({
			// iconUrl: '/Users/jbeachy/Box/BootcampHomework/18-Project2/Project-Two-The-Sasquatch-affair-/images/alien.rtf',
			iconUrl: '../../images/squatch.png',
			//shadowUrl: 'leaf-shadow.png',
			iconSize:     [25, 25], // size of the icon
			//shadowSize:   [50, 64], // size of the shadow
			//iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
			//shadowAnchor: [4, 62],  // the same for the shadow
			popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
		});
			L.marker([45, -120], {icon: SasquatIcon}).addTo(map);

			var UfoIcon = L.icon({
				// iconUrl: '/Users/jbeachy/Box/BootcampHomework/18-Project2/Project-Two-The-Sasquatch-affair-/images/alien.rtf',
				iconUrl: '../../images/ufoIcon.png',
				//shadowUrl: 'leaf-shadow.png',
				iconSize:     [25, 25], // size of the icon
				//shadowSize:   [50, 64], // size of the shadow
				//iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
				//shadowAnchor: [4, 62],  // the same for the shadow
				popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
				L.marker([50, -125], {icon: UfoIcon}).addTo(map);

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
