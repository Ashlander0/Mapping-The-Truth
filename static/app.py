import numpy as np
import os
from decimal import Decimal
import simplejson


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:squirrel@localhost:5432/sightings")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Bigfoot = Base.classes.bigfoot

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/bigfoot<br/>"
    )
@app.route("/api/v1.0/bigfoot")
def bigfoot():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all squatches
    results = session.query(Bigfoot.summary, Bigfoot.location_details, Bigfoot.county, Bigfoot.state, Bigfoot.season, Bigfoot.title, Bigfoot.latitude, Bigfoot.longitude, Bigfoot.date, Bigfoot.number, Bigfoot.classification, Bigfoot.geohash, Bigfoot.temperature_high, Bigfoot.temperature_mid, Bigfoot.temperature_low,
    Bigfoot.dew_point, Bigfoot.humidity, Bigfoot.cloud_cover, Bigfoot.moon_phase, Bigfoot.precip_intensity, Bigfoot.precip_probability, Bigfoot.precip_type, Bigfoot.pressure,
    Bigfoot.weather, Bigfoot.uv_index, Bigfoot.visibility, Bigfoot.wind_bearing, Bigfoot.wind_speed).all()

    session.close()

    # Create a dictionary from the row data and append to a list of bigfoot sightings
    all_bigfoot = []
    for summary, location_details, county, state, season, title, latitude, longitude, date, number, classification, geohash, temperature_high, temperature_mid, temperature_low, dew_point, humidity, cloud_cover, moon_phase, precip_intensity, precip_probability, precip_type, pressure, weather, uv_index, visibility, wind_bearing, wind_speed in results:
        bigfoot_dict = {}
        bigfoot_dict["summary"] = summary
        bigfoot_dict["location_details"] = location_details
        bigfoot_dict["county"] = county
        bigfoot_dict["state"] = state
        bigfoot_dict["season"] = season
        bigfoot_dict["title"] = title
        bigfoot_dict["latitude"] = latitude
        bigfoot_dict["longitude"] = longitude
        bigfoot_dict["date"] = date
        bigfoot_dict["number"] = number
        bigfoot_dict["classification"] = classification
        bigfoot_dict["geohash"] = geohash
        bigfoot_dict["temperature_high"] = temperature_high
        bigfoot_dict["temperature_mid"] = temperature_mid
        bigfoot_dict["temperature_low"] = temperature_low
        bigfoot_dict["dew_point"] = dew_point
        bigfoot_dict["humidity"] = humidity
        bigfoot_dict["cloud_cover"] = cloud_cover
        bigfoot_dict["moon_phase"] = moon_phase
        bigfoot_dict["precip_intensity"] = precip_intensity
        bigfoot_dict["precip_probability"] = precip_probability
        bigfoot_dict["precip_type"] = precip_type
        bigfoot_dict["pressure"] = pressure
        bigfoot_dict["weather"] = weather
        bigfoot_dict["uv_index"] = uv_index
        bigfoot_dict["visibility"] = visibility
        bigfoot_dict["wind_bearing"] = wind_bearing
        bigfoot_dict["wind_speed"] = wind_speed


        all_bigfoot.append(bigfoot_dict)

    return jsonify(all_bigfoot)


if __name__ == '__main__':
    app.run(debug=True)
