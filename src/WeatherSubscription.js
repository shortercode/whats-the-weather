import Result from "./Result";

export default function subscribeWeatherAtLocation ({ appid, location, interval }, handleUpdate) {
	let abort_callback = null;

	function update () {
		let shouldUseResult = true;

		if (location === "") {
			handleUpdate(Result.Err("City not found"));
		}
		else {
			fetchWeatherData(appid, location)
			.then(
				data => {
					if (shouldUseResult) {
						handleUpdate(data);
						setTimeout(update, interval)
					}
				},
				error => {
					if (shouldUseResult) { handleUpdate(Result.Err("Network request failed")); }
				}
			)
		}

		/*
			This is our abort handler. We could use 
			https://developer.mozilla.org/en-US/docs/Web/API/AbortController
			instead but it might be absent for some users.
			So instead we wait until the request has finished, then optionally 
			ignore the data/error if the flag has been cleared by the abort callback. 
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
	.then(res => {
		if (res.ok || res.status === 404) {
			return res;
		}
		else {
			throw new Error(res.statusText);
		}
	})
	.then(res => res.json())
	.then(processWeatherData);
}

function processWeatherData (data) {
	if (data.cod === "404") {
		return Result.Err("City not found");
	}

	if (typeof data.main === "object") {
		const temperature = data.main.temp;
		const pressure = data.main.pressure;
		const humidity = data.main.humidity;
		const time = Date.now();

		return Result.Ok({
			temperature,
			pressure,
			humidity,
			time
		});
	}
}