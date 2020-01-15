import casual from 'casual';

class Variables {
	constructor() {
		this._user1 = {
			createdAt: {
				day: parseInt(casual.day_of_month, 10),
				month: parseInt(casual.month_number, 10),
				year: parseInt(casual.year, 10),
			},
			email: casual.email,
			password: casual.password,
		};
		this._user2 = {
			createdAt: {
				day: parseInt(casual.day_of_month, 10),
				month: parseInt(casual.month_number, 10),
				year: parseInt(casual.year, 10),
			},
			email: casual.email,
			password: casual.password,
		};
		this._device = {
			width: casual.integer(320, 1920),
			height: casual.integer(600, 1080),
		};
		this._token = undefined;
	}

	set token(token) { this._token = token; }
	get token() { return this._token; }
	get user1() { return this._user1; }
	changePassword() { this._user1.password = casual.password; }
	setUser1Id(userId) { this._user1.id = userId; }
	setUser1Roles(roles) { this._user1.roles = roles; }
	get user2() { return this._user2; }
	get device() { return this._device; }
	setDeviceId(deviceId) { this._device.id = deviceId; }
}

export default new Variables();
