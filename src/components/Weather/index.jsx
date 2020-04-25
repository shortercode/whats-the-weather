import React, { useState, useEffect } from "react";

import subscribeWeatherAtLocation from "../../WeatherSubscription";

import UpdateTimer from './UpdateTimer';
import Message from './Message';
import Result from './Result';
import History from './History';

import './Weather.css';

const APP_ID = "f148b96f829bc3f40cb9c4dfe5e6a183";
const UPDATE_INTERVAL = 60000;

export default function Weather () {
	const [location, setLocation] = useState("London");
	const [weatherData, setWeatherData] = useState(null);
	const [lastUpdated, setLastUpdated] = useState(0);
	const [error, setError] = useState("");
	const [tempMode, setTempMode] = useState("c");
	const [previousLocations, setPreviousLocations] = useState([]);

	function handleLocationChange (e) {
		setLocation(e.target.value);
	}

	function handleTempUnitChange (e) {
		setTempMode(e.target.value);
	}

	function appendLocationToHistory (location) {
		const index = previousLocations.indexOf(location);

		if (index > -1) {
			previousLocations.splice(index, 1);
			setPreviousLocations([
				location,
				...previousLocations
			]);
		}
		else {
			if (previousLocations.length >= 5) {
				previousLocations.pop();
			}
			setPreviousLocations([
				location,
				...previousLocations
			])
		}
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
			// NOTE this incorrectly trigger a linter warning, if it's included in the
			// dependecy array it will trigger a resubscription each render instead of
			// when the location changes 
			appendLocationToHistory(location);
			setError("");
			const data = result.unwrap();
			setLastUpdated(data.time);
			setWeatherData(data);
		})
		
	}, [location]);

	let resultBlock;

	if (error) {
		resultBlock = <Message text={error}/>
	}
	else if (weatherData) {
		resultBlock = <Result location={location} tempMode={tempMode} weatherData={weatherData}/>
	}
	else {
		resultBlock = <Message text="loading"/>
	}

	return <div className="weather-widget">
		<h1 className="weather-widget__header">Your weather</h1>
		<div className="weather-widget__body">
			<label className="weather-widget__body__location">
				Enter your location:
				<input 
					className="weather-widget__body__location__input"
					type="text"
					value={location}
					onChange={handleLocationChange}/>
				<select className="weather-widget__body__location__input" value={tempMode} onChange={handleTempUnitChange}>
					<option value="f">Fahrenheit</option>
					<option value="c">Celcius</option>
					<option value="k">Kelvin</option>
				</select>
			</label>
			{resultBlock}
			<UpdateTimer lastUpdated={lastUpdated} interval={UPDATE_INTERVAL}/>
			<History items={previousLocations} setLocation={setLocation}/>
		</div>
	</div>
}