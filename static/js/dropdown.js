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
<<<<<<< HEAD
		var loc = `${response[i].city}, ${response[i].state}: ${response[i].date}`
=======
		var loc = `${response[i].city}, ${response[i].state}: ${response[i].date_time}`
>>>>>>> aa60bbfdc41a7a4770e5177bea99f970e2db1596
		var value = Object.keys(response)[i];
		alienDropdown.append('option').text(`${loc}`).property('value', value);
	};
};
<<<<<<< HEAD

function changeFunction(value, response) {

}
=======
>>>>>>> aa60bbfdc41a7a4770e5177bea99f970e2db1596
