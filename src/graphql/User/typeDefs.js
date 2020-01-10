export default `
	type User {
		id: ID!
		email: String
		password: String
		firstname: String
		lastname: String
		createdAt: DateTime
		lang: String
		timezone: String
		leftHanded: Boolean
		darkMode: Boolean
		connections: [ConnectedWith]
		devices: [Used]
		roles: [Roles]
		cart: [AddedToCart]
		favorites: [AddedToFavorites]
		orders: [Commanded]
		payments: [PaidWith]
		reviews: [Wrote]
	}
	
	enum Roles {
		ADMIN
		CLIENT
		PRODUCT_MANAGER
		MODERATOR
		REDACTOR
	}
	
	type Commanded @relation(name: "COMMANDED", direction: "OUT") {
		date: DateTime
		cancelled: Boolean
		dateCancelled: DateTime
		refunded: Boolean
		dateRefunded: DateTime
	}
	type PaidWith @relation(name: "PAID_WIDTH", direction: "OUT") {
		dateRegistered: DateTime
	}
	
	extend type Mutation {
		Init(
			deviceId: String,
			width: Int,
			height: Int,
			type: String,
			browser: String,
			name: String): Token
		Register(
			email: String!,
			password: String!,
			firstname: String,
			lastname: String): Token
		Login(
			email: String!,
			password: String!): Token
	}
	
`;
