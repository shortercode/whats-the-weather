import React from  "react";

export default function History ({ items, setLocation }) {
	function updateLocation (event) {
		setLocation(event.target.textContent);
	}
	return <ol className="weather-widget__history">
		{items.map(item => <li className="weather-widget__history__item" key={item} onClick={updateLocation}>
			{item}
		</li>)}
	</ol>
}