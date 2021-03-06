export default `
	type Card {
		id: ID!
		name: String
		number: String
		expirationDate: Date
		ccv: Int
		disabled: Boolean
		billingAddress: Address @relation(name: "BILLING_TO", direction: "OUT")
		user: PaidWith
	}
`;
