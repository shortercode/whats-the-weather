import React from "react";

export default function Message ({ text }) {
	return <div className="weather-widget__body__result">
		{text}
	</div>
}