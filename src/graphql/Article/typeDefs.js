export default `
	type Article {
		id: ID!
		title: String!
		image: String!
		description: String
		sections: [InArticle]
		categories: [Category] @relation(name: "IN_CATEGORY", direction: "OUT")
		reviews: [Review] @relation(name: "ABOUT", direction: "IN")
	}

	type InArticle @relation(name: "IN_ARTICLE") {
	  from: Section!
	  to: Article!
	  disposable: Boolean
	}

	input SectionInput {
		title: String
		text: String
		image: String
		size: Int
		disposable: Boolean
	}
	
	extend type Query {
		ArticleById(id: ID!): Article
		AllArticles: [Article]
	}
	extend type Mutation {
		CreateArticle(
			id: ID
			title: String!
			image: String!
			description: String
		): Article
		CreateArticleWithSections(
			title: String!
			image: String!
			description: String
			sections: [SectionInput]
		): Article @hasRole(roles:[ADMIN])
	}

`;
