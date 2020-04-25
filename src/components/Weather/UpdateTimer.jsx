import React, { useState, useEffect } from "react";

export default function UpdateTimer({ lastUpdated, interval }) {
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
		return Math.floor((interval - delta) / 1000);
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