import React, { useState, useEffect } from "react";
// import logo from "./logo.png";
import subscribeWeatherAtLocation from "../../WeatherSubscription";
import './Weather.css';

const APP_ID = "";
const UPDATE_INTERVAL = 30000;

export default function Weather () {
	const [location, setLocation] = useState("London");
	const [weatherData, setWeatherData] = useState(null);
	const [lastUpdated, setLastUpdated] = useState(0);
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
		const data = result.unwrap();
		setLastUpdated(data.time);
		setWeatherData(data);
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
			<UpdateTimer lastUpdated={lastUpdated}/>
		</div>
	</div>
}

function UpdateTimer({ lastUpdated }) {
	const [counter, updateCounter] = useState(calculateRemainingTime());

	useEffect(() => {
		const id = setTimeout(() => {
			updateCounter(calculateRemainingTime());
		}, 1000);
		return () => clearTimeout(id);
	})

	function calculateRemainingTime () {
		const now = Date.now();
		const delta = now - lastUpdated;
		return Math.floor((UPDATE_INTERVAL - delta) / 1000);
	}

	let minutes = 0;
	let seconds = 0;

	if (counter > 0) { 
		minutes = Math.floor(counter / 60);
		seconds = counter % 60;
	}

	return <div className="weather-widget__body__update-timer">
		Refreshing in {minutes}m {seconds}s
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