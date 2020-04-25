import React from "react";

export default function Result ({ weatherData, location, tempMode }) {
	
	let temperature;
	
	switch (tempMode) {
		case "c":
		temperature = kelvinToCelcius(weatherData.temperature);
		break;
		
		case "f":
		temperature = kelvinToFahrenheit(weatherData.temperature);
		break;

		default:
		case "k":
		temperature = weatherData.temperature;
		break;
	}
	return <div className="weather-widget__body__result">
	<h5 className="weather-widget__body__result__header">{location.toUpperCase()}</h5>
<div className="weather-widget__body__result__row">{temperature.toFixed(2)} °{tempMode.toUpperCase()}</div>
	<div className="weather-widget__body__result__row">{weatherData.pressure} hpa</div>
	<div className="weather-widget__body__result__row">{weatherData.humidity} %</div>
	</div>
}


function kelvinToCelcius (temp) {
	return temp - 273.15;
}

function kelvinToFahrenheit (temp) {
	return kelvinToCelcius(temp) * (9/5) + 32;
}