import casual from 'casual';

class Variables {
	constructor() {
		this._user = {
			createdAt: {
				day: parseInt(casual.day_of_month, 10),
				month: parseInt(casual.month_number, 10),
				year: parseInt(casual.year, 10),
			},
		};
		this._connection = {
			ipv4: casual.ip,
		};
		this._device = {
			width: casual.integer(320, 1920),
			height: casual.integer(600, 1080),
		};
	}

	changeIp() {
		this._connection.ipv4 = casual.ip;
	}
	changeDevice() {
		this._device = {
			width: casual.integer(320, 1920),
			height: casual.integer(600, 1080),
		};
	}
	setIp(newIp) {
		this._connection.ipv4 = newIp;
	}

	get user() { return this._user; }
	get connection() { return this._connection; }
	get device() { return this._device; }
}

export default new Variables();
