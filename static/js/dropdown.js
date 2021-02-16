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

function onChange(response, dataset, h) {
	var dropdown = dataset.dropdown;

	dropdown.on('change', function() {
		var value = dropdown.property('value');
		console.log(value);
		document.getElementById('summaryText').style.display = 'block';
		document.getElementById('summaryText').style.height = `calc(100% - ${h}px)`;

		stats.html('');

		if (dropdown == datasets[0].dropdown) {
			stats.html(`<p>Location: ${response[value].county}, ${response[value].state}<br/>
							Date: ${response[value].date}<br/>
							Classification: ${response[value].classification}<br/>
							<br/>
							Incident:</p>`);
		} else if (dropdown == datasets[1].dropdown) {
			stats.html(`<p>Location: ${response[value].city}, ${response[value].state}<br/>
							Date: ${response[value].date}<br/>
							Duration: ${response[value].duration}<br/>
							Shape: ${response[value].shape}<br/>
							<a href='${response[value].report_link}' target="_blank">Report Link</a><br/>
							<br/>
							Incident:</p>`);
		} else if (dropdown == datasets[2].dropdown) {
			stats.html(`<p>Location: ${response[value].location}, ${response[value].state_abbrev}<br/>
							Date: ${response[value].date}<br/>
							<br/>
							Incident:</p>`);
		} else if (dropdown == datasets[3].dropdown) {
			stats.html(`<p>Location: ${response[value].city}, ${response[value].state_abbrev}<br/>
							<br/>
							Incident:</p>`);
		};

		summaryText.text('');
		summaryText.text(response[value].summary);
		map.flyTo([response[value].latitude, response[value].longitude], 15);
	});
};

function buttonToggle(dataset) {
	var darkbuttons = d3.selectAll('.toggle-on');;
	var darkdropdowns = d3.selectAll('.dropdown');
	var button = dataset.button;
	var dropdown = dataset.dropdown;

	button.on('click', function() {
		// disable everything
		darkbuttons.classed('toggle-on', false);
		darkbuttons.classed('toggle-off', true);
		darkdropdowns.style('display', 'none');

		// re-enable appropriate controls
		button.classed('toggle-on', true);
		button.classed('toggle-off', false);
		dropdown.style('display', 'inline-block');
		console.log(dropdown);
	});
};
