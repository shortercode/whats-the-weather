import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { kelvinToCelcius, kelvinToFahrenheit } from "./temperature_utils";

import MessageComponent from './Message';
import ResultComponent from './Result';
import HistoryComponent from './History';
import Result from '../../Result';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("components", () => {
	describe("Message", () => {
		it("contains the given message", () => {
			const message = "Welcome to the tests";
			act(() => {
				render(<MessageComponent text={message}/>, container);
			});
			expect(container.textContent).toBe(message);
		})
	});

	const weatherData = {
		temperature: 27.3,
		pressure: 1000,
		humidity: 42
	};

	describe("Result", () => {
		it("contains displays fahrenheit correctly", () => {
			const location = "example location";
			const tempMode = "f";

			const temperature = kelvinToFahrenheit(weatherData.temperature)

			act(() => {
				render(<ResultComponent weatherData={weatherData} location={location} tempMode={tempMode}/>, container);
			});
			expect(container.textContent).toBe(`${location.toUpperCase()}${temperature.toFixed(2)} °${tempMode.toUpperCase()}${weatherData.pressure} hpa${weatherData.humidity} %`);
		})

		it("contains displays celcius correctly", () => {
			const location = "example location";
			const tempMode = "c";

			const temperature = kelvinToCelcius(weatherData.temperature)

			act(() => {
				render(<ResultComponent weatherData={weatherData} location={location} tempMode={tempMode}/>, container);
			});
			expect(container.textContent).toBe(`${location.toUpperCase()}${temperature.toFixed(2)} °${tempMode.toUpperCase()}${weatherData.pressure} hpa${weatherData.humidity} %`);
		})

		it("contains displays kelvin correctly", () => {
			const location = "example location";
			const tempMode = "k";

			const temperature = weatherData.temperature;

			act(() => {
				render(<ResultComponent weatherData={weatherData} location={location} tempMode={tempMode}/>, container);
			});
			expect(container.textContent).toBe(`${location.toUpperCase()}${temperature.toFixed(2)} °${tempMode.toUpperCase()}${weatherData.pressure} hpa${weatherData.humidity} %`);
		})
	})

	describe("History", () => {
		it("lists items", () => {
			const items = [
				"Madrid",
				"London",
				"Paris",
				"Oxford",
				"Wellington"
			];
			const noop = () => {};
			act(() => {
				render(<HistoryComponent items={items} setLocation={noop}/>, container);
			});
			expect(container.textContent).toBe(items.join(""));
		});
	})
});

describe("result class", () => {
	describe("Ok", () => {
		const value = [];
		const result = Result.Ok(value);

		it("unwraps into a value", () => {
			expect(result.unwrap()).toBe(value);
		})

		it("throws if unwrapErr is called", () => {
			expect(() => result.unwrapErr()).toThrow(Error);
		})

		it("is ok", () => {
			expect(result.isOk()).toBe(true)
		});

		it("isn't an error", () => {
			expect(result.isError()).toBe(false);
		})
	})

	describe("Err", () => {
		const value = "failure";
		const result = Result.Err(value);

		it("unwraps into a value", () => {
			expect(result.unwrapErr()).toBe(value);
		})

		it("throws if unwrap is called", () => {
			expect(() => result.unwrap()).toThrow(Error);
		})

		it("is error", () => {
			expect(result.isError()).toBe(true)
		});

		it("isn't ok", () => {
			expect(result.isOk()).toBe(false);
		})
	})
})
