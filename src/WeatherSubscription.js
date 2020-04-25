export default function useWeatherSubscription ({ appid, location, interval }, handleUpdate) {
	let abort_callback = null;

	function update () {
		let shouldUseResult = true;

		fetchWeatherData()
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
	return fetch('https://api.openweathermap.org/data/2.5/weather', {
		body: JSON.stringify({
			appid: appid,
			q: location
		})
	})
	.then(res => res.json())
	.then(processWeatherData);
}

function processWeatherData (data) {
	console.log(data);
	return data;
}