// Add options for each sighting to dropdown
var stats = d3.select('#stat');
var summaryText = d3.select('#summaryText');

// populate dropdowns //
function addToDropdown(response, dataset) {
	for (i = 0; i < Object.keys(response).length; i++) {
		var value = Object.keys(response)[i];
		var dropdown = dataset.dropdown;

		if (dataset.icon == bigfootIcon) {
			var text = `Report #${response[i].number}`;
			dropdown.append('option').text(text).property('value', value);

		} else if (dataset.icon == ufoIcon) {
			var text = `Report #${value}`;
			dropdown.append('option').text(text).property('value', value);
		
		} else if (dataset.icon == dogmanIcon) {
			var text = `Report #${value}`;
			dropdown.append('option').text(text).property('value', value);
		
		} else if (dataset.icon == hauntedIcon) {
			var text = `${response[i].location}, ${response[i].state_abbrev}`;
			dropdown.append('option').text(text).property('value', value);
		};
	};
};


// Dropdown controls
function dropdownChange(response, dataset, h) {
	var dropdown = dataset.dropdown;
	dropdown.on('change', function() {
		var value = dropdown.property('value');
		console.log(value);

		onChange(response[value], dataset, h);
	});
};

function onChange(response, dataset, h) {
	var dropdown = dataset.dropdown

	document.getElementById('summaryText').style.display = 'block';
	document.getElementById('summaryText').style.maxHeight = `calc(100% - ${h}px)`;

	stats.html('');

	if (dropdown == datasets[0].dropdown) {
		stats.html(`<p>Location: ${response.county}, ${response.state}<br/>
						Date: ${response.date}<br/>
						Classification: ${response.classification}<br/>
						<br/>
						Incident:</p>`);
	} else if (dropdown == datasets[1].dropdown) {
		stats.html(`<p>Location: ${response.city}, ${response.state}<br/>
						Date: ${response.date}<br/>
						Duration: ${response.duration}<br/>
						Shape: ${response.shape}<br/>
						<a href='${response.report_link}' target="_blank">Report Link</a><br/>
						<br/>
						Incident:</p>`);
	} else if (dropdown == datasets[2].dropdown) {
		stats.html(`<p>Location: ${response.location}, ${response.state_abbrev}<br/>
						Date: ${response.date}<br/>
						<br/>
						Incident:</p>`);
	} else if (dropdown == datasets[3].dropdown) {
		stats.html(`<p>Location: ${response.city}, ${response.state_abbrev}<br/>
						<br/>
						Incident:</p>`);
	};

	summaryText.text('');
	summaryText.text(response.summary);
	map.flyTo([response.latitude, response.longitude], 15);
};


// Button Toggle
function buttonToggle(dataset) {
	var button = dataset.button;

	button.on('click', function () {
		onToggle(dataset);
	});
};

function onToggle(dataset) {
	var darkbuttons = d3.selectAll('.toggle-on');;
	var darkdropdowns = d3.selectAll('.dropdown');
	var button = dataset.button;
	var dropdown = dataset.dropdown;

	// disable everything
	darkbuttons.classed('toggle-on', false);
	darkbuttons.classed('toggle-off', true);
	darkdropdowns.style('display', 'none');

	// re-enable appropriate controls
	button.classed('toggle-on', true);
	button.classed('toggle-off', false);
	dropdown.style('display', 'inline-block');
};