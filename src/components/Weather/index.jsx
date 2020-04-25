import React, { useState, useEffect } from "react";
// import logo from "./logo.png";
import subscribeWeatherAtLocation from "../../WeatherSubscription";
import './Weather.css';

const APP_ID = "";
const UPDATE_INTERVAL = 5000;

export default function Weather () {
	const [location, setLocation] = useState("London");
	const [weatherData, setWeatherData] = useState(null);
	const [error, setError] = useState("");

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
		setWeatherData(result.unwrap());
	}

	let resultBlock;

	if (error) {
		resultBlock = <Message text={error}/>
	}
	else if (weatherData) {
		resultBlock = <Result location={location} weatherData={weatherData}/>
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
			<div className="weather-widget__body__update-timer">
				Refreshing in 1m 5s
			</div>
		</div>
	</div>
}

function Message ({ text }) {
	return <div className="weather-widget__body__result">
		{text}
	</div>
}

function Result ({ weatherData, location }) {
	return <div className="weather-widget__body__result">
		<h5 className="weather-widget__body__result__header">{location.toUpperCase()}</h5>
		<div className="weather-widget__body__result__row">{weatherData.temperature} °K</div>
		<div className="weather-widget__body__result__row">{weatherData.pressure} hpa</div>
		<div className="weather-widget__body__result__row">{weatherData.humidity} %</div>
	</div>
}