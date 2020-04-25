import React, { useState, useEffect } from "react";
// import logo from "./logo.png";
import subscribeWeatherAtLocation from "../../WeatherSubscription";
import './Weather.css';
import UpdateTimer from './UpdateTimer';
import Message from './Message';
import Result from './Result';

const APP_ID = "";
const UPDATE_INTERVAL = 60000;

export default function Weather () {
	const [location, setLocation] = useState("London");
	const [weatherData, setWeatherData] = useState(null);
	const [lastUpdated, setLastUpdated] = useState(0);
	const [error, setError] = useState("");
	const [tempMode, setTempMode] = useState("c");

	useEffect(() => {
		const opts = {
			appid: APP_ID, location, interval: UPDATE_INTERVAL
		};
		return subscribeWeatherAtLocation(opts, handleWeatherUpdate)
	}, [location]);

	function updateLocation (e) {
		setLocation(e.target.value);
	}

	function handleWeatherUpdate (result) {
		if (result.isError()) {
			setError(result.unwrapErr());
			return;
		}
		setError("");
		const data = result.unwrap();
		setLastUpdated(data.time);
		setWeatherData(data);
	}

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
					onChange={updateLocation}/>
			</label>
			{resultBlock}
			<UpdateTimer lastUpdated={lastUpdated} interval={UPDATE_INTERVAL}/>
		</div>
	</div>
}