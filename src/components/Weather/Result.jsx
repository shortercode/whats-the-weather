import React from "react";

export default function Result ({ weatherData, location }) {
	return <div className="weather-widget__body__result">
		<h5 className="weather-widget__body__result__header">{location.toUpperCase()}</h5>
		<div className="weather-widget__body__result__row">{weatherData.temperature} °K</div>
		<div className="weather-widget__body__result__row">{weatherData.pressure} hpa</div>
		<div className="weather-widget__body__result__row">{weatherData.humidity} %</div>
	</div>
}