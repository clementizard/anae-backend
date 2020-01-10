export default `
	type Category {
		id: ID!
		name: String!
		description: String
		articles: [Article] @relation(name: "IN_CATEGORY", direction: "IN")
		collections: [Collection] @relation(name: "IN_CATEGORY", direction: "IN")
		products: [Product] @relation(name: "IN_CATEGORY", direction: "IN")
	}
`;
