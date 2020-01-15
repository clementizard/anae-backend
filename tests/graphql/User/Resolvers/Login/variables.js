import casual from 'casual';

class Variables {
	constructor() {
		this._user = {
			createdAt: {
				day: parseInt(casual.day_of_month, 10),
				month: parseInt(casual.month_number, 10),
				year: parseInt(casual.year, 10),
			},
			email: casual.email,
			password: casual.password,
			firstname: casual.first_name,
			lastname: casual.last_name,
		};
		this._device = {
			width: casual.integer(320, 1920),
			height: casual.integer(600, 1080),
		};
	}

	get user() { return this._user; }
	setUserId(userId) { this._user.id = userId; }
	setUserToken(token) { this._user.token = token; }
	get device() { return this._device; }
	setDeviceId(deviceId) { this._device.id = deviceId; }
}

export default new Variables();
