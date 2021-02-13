// Add options for each sighting to dropdown
var bigfootDropdown = d3.select('#BFdropdown');
var alienDropdown = d3.select('#UFOdropdown');
var dogmanDropdown = d3.select('#DMdropdown');
var hauntedDropdown = d3.select('#HPdropdown');
var stats = d3.select('#stat');
var summaryText = d3.select('#summaryText');

// populate dropdowns //
function addToBFDropdown(response) {
	for (i = 0; i < Object.keys(response).length; i++) {
		var value = Object.keys(response)[i];
		var text = `Report #${response[i].number}`;
	
		bigfootDropdown.append('option').text(text).property('value', value);
	};
};

function addToADropdown(response) {
	for (i = 0; i < Object.keys(response).length; i++) {
		var value = Object.keys(response)[i];
		var text = `Report #${value}`;
		alienDropdown.append('option').text(text).property('value', value);
	};
};

function addToDMDropdown(response) {
	for (i = 0; i < Object.keys(response).length; i++) {
		var value = Object.keys(response)[i];
		var text = `Report #${value}`;
		dogmanDropdown.append('option').text(text).property('value', value);
	};
};

function addToHPDropdown(response) {
	for (i = 0; i < Object.keys(response).length; i++) {
		var value = Object.keys(response)[i];
		var text = `${response[i].location}, ${response[i].state_abbrev}`;
		hauntingDropdown.append('option').text(text).property('value', value);
	};
};



// change data on dropdown select //
bigfootDropdown.on('change', function() {onChange(bigfootDropdown, bigfootURL)});
alienDropdown.on('change', function() {onChange(alienDropdown, alienURL)});

function onChange(DD, URL) {
	value = DD.property('value');
	console.log(value);
	document.getElementById('summaryText').style.display = 'block';

	
	d3.json(URL, function(response) {
		stats.html('');

		if (DD == bigfootDropdown) {
			stats.html(`<p>Location: ${response[value].county}, ${response[value].state}<br/>
							Date: ${response[value].date}<br/>
							Classification: ${response[value].classification}<br/>
							<br/>
							Incident:</p>`);

		} else if (DD == alienDropdown) {
			stats.html(`<p>Location: ${response[value].city}, ${response[value].state}<br/>
							Date: ${response[value].date}<br/>
							Duration: ${response[value].duration}<br/>
							Shape: ${response[value].shape}<br/>
							<br/>
							Incident:</p>`);
		};
		summaryText.text('');
		summaryText.text(response[value].summary);
		map.flyTo([response[value].latitude, response[value].longitude], 15);
	});
};

// define buttons
var BFbutton = d3.select('#BFbutton');
var UFObutton = d3.select('#UFObutton');
var DMbutton = d3.select('#DMbutton');
var HPbutton = d3.select('#HPbutton');

// define on click actions
BFbutton.on('click', function() {buttonToggle('BFbutton', 'BFdropdown')});
UFObutton.on('click', function() {buttonToggle('UFObutton', 'UFOdropdown')});
DMbutton.on('click', function() {buttonToggle('DMbutton', 'DMdropdown')});
HPbutton.on('click', function() {buttonToggle('HPbutton', 'HPdropdown')});

function buttonToggle(clickedB, clickedD) {
	var darkbuttons = document.getElementsByClassName("toggle");
	var darkdropdowns = document.getElementsByClassName('dropdown');
	var button = document.getElementById(clickedB);
	var dropdown = document.getElementById(clickedD);
	
	// disable everything
	for (b = 0; b < darkbuttons.length; b++) {
		darkbuttons[b].style.backgroundColor = "rgba(0,0,0,0)";
		darkbuttons[b].style.color = "darkorange";
		
		for (d = 0; d < darkdropdowns.length; d++) {
			darkdropdowns[d].style.display = "none";
		};
	};

	// re-enable appropriate controls
	button.style.backgroundColor = "darkorange";
	button.style.color = "black";
	dropdown.style.display = 'inline-block';
	document.getElementById('summaryText').style.height = 'calc(100% - 153px)';
	console.log(clickedD);
};
