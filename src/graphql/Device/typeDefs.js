export default `
	type Device {
		id: ID!
		width: Int
		height: Int
		type: String
		browser: String
		name: String
		owners: [Used]
	}

	type Used @relation(name: "USED", direction: "IN") {
		from: User!
		to: Device!
		lastDate: DateTime
	}
`;
