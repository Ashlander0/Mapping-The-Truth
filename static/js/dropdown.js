// Add options for each sighting to dropdown
var bigfootDropdown = d3.select('#bigfoot');
var alienDropdown = d3.select('#alien');
var stats = d3.select('#stat');
var summaryText = d3.select('#summaryText');

function addToBFDropdown(response) {
	for (i = 0; i < Object.keys(response).length; i++) {
		var report = response[i].number;
		//var loc = `${response[i].state} - ${response[i].date}`
		var value = Object.keys(response)[i];
		bigfootDropdown.append('option').text(`Report #${report}`).property('value', value);
	};
};

function addToADropdown(response) {
	for (i = 0; i < Object.keys(response).length; i++) {
		var loc = `${response[i].city}, ${response[i].state}`
		var value = Object.keys(response)[i];
		alienDropdown.append('option').text(`${loc}`).property('value', value);
	};
};

bigfootDropdown.on('change', onChangeBF);
alienDropdown.on('change', onChangeUFO);

function onChangeBF() {
	value = bigfootDropdown.property('value');
	console.log(value);
	document.getElementById('summaryText').style.display = 'block';

	d3.json(bigfootURL, function(response) {
		stats.html('');
		stats.html(`<p>Location: ${response[value].county}, ${response[value].state}<br/>
						Date: ${response[value].date}<br/>
						Classification: ${response[value].classification}<br/>
						<br/>
						Incident:</p>`);
		summaryText.text('');
		summaryText.text(response[value].summary)
	});
};

function onChangeUFO() {
	value = alienDropdown.property('value');
	console.log(value);
	document.getElementById('summaryText').style.display = 'block';
	
	d3.json(alienURL, function(response) {
		stats.html('');
		stats.html(`<p>Location: ${response[value].city}, ${response[value].state}<br/>
						Date: ${response[value].date}<br/>
						Duration: ${response[value].duration}<br/>
						Shape: ${response[value].shape}<br/>
						<br/>
						Incident:</p>`);
		summaryText.text('');
		summaryText.text(response[value].summary)
	});
};

var BFbutton = d3.select('#BFbutton');
var UFObutton = d3.select('#UFObutton');
//  bigfootDropdown = d3.select('#bigfoot');
//  alienDropdown = d3.select('#alien');

BFbutton.on('click', BFtoggle);
UFObutton.on('click', UFOtoggle);

function BFtoggle() {
	document.getElementById("UFObutton").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("UFObutton").style.color = "darkorange";
	document.getElementById("alien").style.display = "none";

	document.getElementById("BFbutton").style.backgroundColor = "darkorange";
	document.getElementById("BFbutton").style.color = "black";
	document.getElementById("bigfoot").style.display = "block";
	console.log('Bigfoot');
}

function UFOtoggle() {
	document.getElementById("BFbutton").style.backgroundColor = "rgba(0,0,0,0)";
	document.getElementById("BFbutton").style.color = "darkorange";
	document.getElementById("bigfoot").style.display = "none";

	document.getElementById("UFObutton").style.backgroundColor = "darkorange";
	document.getElementById("UFObutton").style.color = "black";
	document.getElementById("alien").style.display = "block";
	console.log('UFO');
}