// Todo:  Add a "disabled" field.

export default `
	type User {
		id: ID!
		email: String
		password: String @hasRole(roles:[ADMIN])
		firstname: String
		lastname: String
		lang: String
		timezone: String
		leftHanded: Boolean
		darkMode: Boolean
		roles: [Role]
		createdAt: DateTime @hasRole(roles:[ADMIN])
		connections: [ConnectedWith]
		devices: [Used]
		cart: [AddedToCart] @hasRole(roles:[ADMIN, CLIENT])
		favorites: [AddedToFavorites] @hasRole(roles:[ADMIN, CLIENT])
		orders: [Commanded] @hasRole(roles:[ADMIN, CLIENT])
		payments: [PaidWith] @hasRole(roles:[ADMIN, CLIENT])
		reviews: [Wrote] @hasRole(roles:[ADMIN, MODERATOR, CLIENT])
	}

	enum Role {
		ADMIN
		CLIENT
		PRODUCT_MANAGER
		MODERATOR
		REDACTOR
	}

	type Commanded @relation(name: "COMMANDED", direction: "OUT") {
		from: User!
		to: Order!
		date: DateTime
		cancelled: Boolean
		dateCancelled: DateTime
		refunded: Boolean
		dateRefunded: DateTime
	}
	type PaidWith @relation(name: "PAID_WIDTH", direction: "OUT") {
		from: User!
		to: Card!
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
			lastname: String): Token @isAuthenticated
		Login(
			email: String!,
			password: String!): Token @isAuthenticated
		ChangePassword(
			email: String!
			newPassword: String!
			oldPassword: String!
		): Success @hasRole(roles:[ADMIN, PRODUCT_MANAGER, MODERATOR, REDACTOR, CLIENT])
	}
	
`;
