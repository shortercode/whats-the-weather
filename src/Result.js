export default class Result {
	constructor (isError, data) {
		this._isError = isError;
		this._data = data;
	}
	isOk () {
		return this._isError === false;
	}
	isError () {
		return this._isError;
	}
	unwrap () {
		if (this.isError()) {
			throw new Error(this._data);
		}
		return this._data;
	}
	unwrapErr () {
		if (this.isOk()) {
			throw new Error("Result is not an error");
		}
		return this._data;
	}
	static Err (message) {
		return new Result(true, message);
	}
	static Ok (data) {
		return new Result(false, data);
	}
}
