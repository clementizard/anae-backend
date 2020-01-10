export default `
	type Collection {
		id: ID!
		name: String!
		image: String
		description: String
		categories: [Category] @relation(name: "IN_CATEGORY", direction: "OUT")
		products: [Product] @relation(name: "IN_COLLECTION", direction: "IN")
	}
`;
