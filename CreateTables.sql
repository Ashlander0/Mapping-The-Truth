drop table aliens;
drop table bigfoot;
drop table dogman;
drop table hauntings;

CREATE TABLE aliens(
	title VARCHAR(500),
	city VARCHAR(60),
	state VARCHAR(60),
	date_time date,
	shape VARCHAR(60),
	duration VARCHAR(60),
	stats VARCHAR(500),
	report_link VARCHAR(200),
	summary VARCHAR(50000), 
	posted date,
	latitude decimal, 
	longitude decimal
);

CREATE TABLE bigfoot(
	summary VARCHAR(35000),
	location_details VARCHAR(4000),
	county VARCHAR(30),
	state VARCHAR(15),
	season VARCHAR(15),
	title VARCHAR(300),
	latitude decimal,
	longitude decimal,
	date date,
	number integer PRIMARY KEY,
	classification VARCHAR(10),
	geohash VARCHAR(30),
	temperature_high decimal,
	temperature_mid decimal,
	temperature_low decimal,
	dew_point decimal,
	humidity decimal,
	cloud_cover decimal,
	moon_phase decimal,
	precip_intensity decimal,
	precip_probability decimal,
	precip_type	VARCHAR(30),
	pressure decimal,
	weather VARCHAR(50000),
	uv_index integer,
	visibility decimal,
	wind_bearing integer,
	wind_speed decimal
);

CREATE TABLE dogman(
	state VARCHAR(30),
	state_abbrev VARCHAR(10),
	location VARCHAR(60),
	longitude decimal,
	latitude decimal,
	date date,
	summary VARCHAR(20000)
);

CREATE TABLE hauntings(
	city VARCHAR(60),
	country VARCHAR(60),
	summary VARCHAR(10000),
	location VARCHAR(1500),
	state VARCHAR(20),
	state_abbrev VARCHAR(2),
	longitude decimal,
	latitude decimal,
	city_longitude decimal,
	city_latitude decimal
);

COPY aliens(title, city, state, date_time, shape, duration, stats, report_link, summary, posted, latitude, longitude)
FROM 'C:\Users\Matthew\Desktop\Homework\Project-Two-The-Sasquatch-affair-\Data\aliens-1.csv'
DELIMITER ','
CSV HEADER;

COPY aliens(title, city, state, date_time, shape, duration, stats, report_link, summary, posted, latitude, longitude)
FROM 'C:\Users\Matthew\Desktop\Homework\Project-Two-The-Sasquatch-affair-\Data\aliens-2.csv'
DELIMITER ','
CSV HEADER;

COPY bigfoot(summary, location_details, county, state, season, title, latitude, longitude, date, number, classification, geohash, temperature_high, temperature_mid, temperature_low, dew_point, humidity, cloud_cover, moon_phase, precip_intensity, precip_probability, precip_type, pressure, weather, uv_index, visibility, wind_bearing, wind_speed)
FROM 'C:\Users\Matthew\Desktop\Homework\Project-Two-The-Sasquatch-affair-\Data\bigfoot.csv'
DELIMITER ','
CSV HEADER;
	
COPY dogman(state, state_abbrev, location, longitude, latitude, date, summary)
FROM 'C:\Users\Matthew\Desktop\Homework\Project-Two-The-Sasquatch-affair-\Data\dogman.csv'
DELIMITER ','
CSV HEADER;

COPY hauntings(city, country, summary, location, state, state_abbrev, longitude, latitude, city_longitude, city_latitude)
FROM 'C:\Users\Matthew\Desktop\Homework\Project-Two-The-Sasquatch-affair-\Data\hauntedplaces.csv'
DELIMITER ','
CSV HEADER;


select * from aliens;
select * from bigfoot;
select * from dogman;
select * from hauntings;