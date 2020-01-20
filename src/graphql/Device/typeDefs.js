export default `
	type Device {
		id: ID!

		type: String
		brand: String
		model: String
		width: Int
		height: Int

		clientType: String
		clientName: String
		clientVersion: String
		clientEngine: String
		clientEngineVersion: String

		osName: String
		osVersion: String
		osPlatform: String

		botName: String
		botCategory: String
		botUrl: String
		botProducerName: String
		botProducerUrl: String

		owners: [Used]
	}

	type Used @relation(name: "USED", direction: "IN") {
		from: User!
		to: Device!
		lastDate: DateTime
	}
`;
