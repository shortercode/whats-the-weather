export default function subscribeWeatherAtLocation ({ appid, location, interval }, handleUpdate) {
	let abort_callback = null;

	function update () {
		let shouldUseResult = true;

		fetchWeatherData(appid, location)
		.then(
			result => {
				if (shouldUseResult) { handleUpdate(null, result); }
			},
			error => {
				if (shouldUseResult) { handleUpdate(error, null); }
			}
		)

		/*
			This is our abort handler. We could use 
			https://developer.mozilla.org/en-US/docs/Web/API/AbortController
			instead but it might be absent for some users.
			So instead we wait until the request has finished, then optionally 
			ignore the result/error if the flag has been cleared by the abort callback. 
		*/

		return () => {
			shouldUseResult = false;
		}
	}

	abort_callback = update();

	return () => {
		if (abort_callback !== null) {
			abort_callback();
			abort_callback = null;
		}
	}
}

function fetchWeatherData (appid, location) {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appid}`;
	
	return fetch(url)
	.then(res => res.json())
	.then(processWeatherData);
}

function processWeatherData (data) {
	const temperature = data.main?.temp;
	const pressure = data.main?.pressure;
	const humidity = data.main?.humidity;
	const time = Date.now();

	return {
		temperature,
		pressure,
		humidity,
		time
	};
}