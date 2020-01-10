export default `
	type Review {
		id: ID!
		title: String
		text: String
		images: [String]
		score: Int
		article: Article @relation(name: "ABOUT", direction: "OUT")
		product: Product @relation(name: "ABOUT", direction: "OUT")
		author: Wrote!
		edited: [Edited]
		deleted: Deleted
	}
	
	type Wrote @relation(name: "WROTE") {
		from: User!
		to: Review!
		date: DateTime!
	}
	type Edited @relation(name: "EDITED") {
		from: User!
		to: Review!
		date: DateTime!
		diff: String
	}
	type Deleted @relation(name: "DELETED") {
		from: User!
		to: Review!
		date: DateTime
	}
`;
