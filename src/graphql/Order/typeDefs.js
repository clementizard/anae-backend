export default `
	type Order {
		id: ID!
		costFees: Float
		costShipping: Float
		currency: String
		discountCode: String
		products: [InOrder]
		address: SentTo
	}

	type InOrder @relation(name: "IN_ORDER") {
		from: Product!
		to: Order!
		price: Float!
		size: Int
		discountBundle: Int
		discountSales: Int
	}
`;
