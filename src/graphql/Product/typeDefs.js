export default `
	type Product {
		id: ID!
		name: String!
		description: String
		images: [String]!
		prices: [Float]!
		discountBundle: Int
		discountSales: Int
		discountSalesExp: DateTime
		stock: Int
		sizes: [Int]
		categories: [Category] @relation(name: "IN_CATEGORY", direction: "OUT")
		collection: [Collection] @relation(name: "IN_COLLECTION", direction: "OUT")
		orders: [InOrder] @hasRole(roles:[ADMIN, PRODUCT_MANAGER])
		variants: [String]
		reviews: [Review] @relation(name: "ABOUT", direction: "IN")
		inCart: [AddedToCart] @hasRole(roles:[ADMIN, PRODUCT_MANAGER])
		inFavorites: [AddedToFavorites] @hasRole(roles:[ADMIN, PRODUCT_MANAGER])
	}

	type AddedToCart @relation(name: "ADDED_TO_CART") {
		from: User!
		to: Product!
		date: DateTime
	}
	type AddedToFavorites @relation(name: "ADDED_TO_FAVORITES") {
		from: User!
		to: Product!
		date: DateTime
	}
`;
