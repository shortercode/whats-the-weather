export function kelvinToCelcius (temp) {
	return temp - 273.15;
}

export function kelvinToFahrenheit (temp) {
	return kelvinToCelcius(temp) * (9/5) + 32;
}