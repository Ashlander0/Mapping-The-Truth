// Add options for each sighting to dropdown
var bigfootDropdown = d3.select('#bigfoot');
var alienDropdown = d3.select('#alien');

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
		var loc = `${response[i].city}, ${response[i].state}: ${response[i].date}`
		var value = Object.keys(response)[i];
		alienDropdown.append('option').text(`${loc}`).property('value', value);
	};
};

function changeFunction(value, response) {

}