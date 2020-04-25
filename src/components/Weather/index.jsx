import React, { useState } from "react";
// import logo from "./logo.png";
import './Weather.css';

export default function Weather () {
	const [location, setLocation] = useState("London");

	function updateLocation (e) {
		setLocation(e.target.value);
	}

	return <div class="weather-widget">
		<h1 class="weather-widget__header">Your weather</h1>
		<div class="weather-widget__body">
			<label class="weather-widget__body__location">
				Enter your location:
				<input 
					class="weather-widget__body__location__input"
					type="text"
					value={location}
					onInput={updateLocation}/>
			</label>
			<div class="weather-widget__body__result">
				<h5 class="weather-widget__body__result__header">{location.toUpperCase()}</h5>
				<div class="weather-widget__body__result__row">12.44 °C</div>
				<div class="weather-widget__body__result__row">1032 hpa</div>
				<div class="weather-widget__body__result__row">71 %</div>
			</div>
			<div class="weather-widget__body__update-timer">
				Refreshing in 1m 5s
			</div>
		</div>
	</div>
}