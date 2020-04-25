import React, { useState, useEffect } from "react";

import subscribeWeatherAtLocation from "../../WeatherSubscription";
import { debounceCaller } from "../../debounce";

import UpdateTimerComponent from './UpdateTimer';
import MessageComponent from './Message';
import ResultComponent from './Result';
import HistoryComponent from './History';

import './Weather.css';

const APP_ID = "f148b96f829bc3f40cb9c4dfe5e6a183";
const UPDATE_INTERVAL = 60000;

const debouncedLocationHandler = debounceCaller(1000);

export default function Weather () {
	const [location, setLocation] = useState("London");
	const [locationLabel, setLocationLabel] = useState(location);
	const [weatherData, setWeatherData] = useState(null);
	const [lastUpdated, setLastUpdated] = useState(0);
	const [errorMessage, setError] = useState("");
	const [temperatureMode, setTempMode] = useState("c");
	const [previousLocations, setPreviousLocations] = useState([]);

	function handleLocationChange(value) {
		// NOTE as we're debouncing the update we have to use a seperate
		// piece of state to hold the value of the input
		setLocationLabel(value);
		debouncedLocationHandler(value => setLocation(value), value);
	}

	function handleTempUnitChange (e) {
		setTempMode(e.target.value);
	}

	useEffect(() => {

		const opts = {
			appid: APP_ID,
			location,
			interval: UPDATE_INTERVAL
		};

		return subscribeWeatherAtLocation(opts, (result) => {

			if (result.isError()) {
				setError(result.unwrapErr());
				return;
			}

			setPreviousLocations(locations => {
				const index = locations.indexOf(location);

				if (index > -1) {
					locations.splice(index, 1);
				}
				else if (locations.length >= 5) {
					locations.pop();
				}
					
				setPreviousLocations( [
					location,
					...locations
				]);
			});

			setError("");
			const data = result.unwrap();
			setLastUpdated(data.time);
			setWeatherData(data);
		})
		
	}, [location]);

	let resultBlock;

	if (errorMessage) {
		resultBlock = <MessageComponent text={errorMessage}/>
	}
	else if (weatherData) {
		resultBlock = <ResultComponent location={location} tempMode={temperatureMode} weatherData={weatherData}/>
	}
	else {
		resultBlock = <MessageComponent text="loading"/>
	}

	return <div className="weather-widget">
		<h1 className="weather-widget__header">Your weather</h1>
		<div className="weather-widget__body">
			<label className="weather-widget__body__location">
				Enter your location:
				<input 
					className="weather-widget__body__location__input"
					type="text"
					value={locationLabel}
					onChange={e => handleLocationChange(e.target.value)}/>
				<select className="weather-widget__body__location__input" value={temperatureMode} onChange={handleTempUnitChange}>
					<option value="f">Fahrenheit</option>
					<option value="c">Celcius</option>
					<option value="k">Kelvin</option>
				</select>
			</label>
			{resultBlock}
			<UpdateTimerComponent lastUpdated={lastUpdated} interval={UPDATE_INTERVAL}/>
			<HistoryComponent items={previousLocations} setLocation={handleLocationChange}/>
		</div>
	</div>
}