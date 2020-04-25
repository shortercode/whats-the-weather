export function debounce(limit, fn) {
	let timer = -1;
	return (...args) => {

		if (timer !== -1) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			timer = -1;
			fn(...args);
		}, limit)
	}
}

export function debounceCaller (duration) {
	let callback = null;

	const caller = debounce(duration, (...args) => {
		callback(...args);
	});

	return (fn, ...values) => {
		callback = fn;
		caller(...values);
	}
}