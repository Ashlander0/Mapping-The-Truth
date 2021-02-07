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