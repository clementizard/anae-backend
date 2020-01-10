export default `
	type Address {
		id: ID!
		name: String
		floor: Int
		postalCode: Int!
		streetNumber: String!
		streetName: String!
		country: String
		city: String!
		orders: [SentTo]
		linkedCard: [Card] @relation(name: "BILLING_TO", direction: "IN")
	}
	
	enum OrderStatus {
		NEW
		WAITING
		ASSEMBLED
		PACKED
		SENT
		RECEIVED
		REFUNDED
	}

	type SentTo @relation(name: "SENT_TO") {
		from: Order!
		to: Address!
		status: OrderStatus!
		transporter: String
		tracking: String
	}
`;
