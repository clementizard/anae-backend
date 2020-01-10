export default `
	type Connection {
		id: ID!
		ipv4: String!
		users: [ConnectedWith]
	}
	
	type ConnectedWith @relation(name: "CONNECTED_WITH") {
		from: User!
		to: Connection!
		lastDate: DateTime
	}
`;
