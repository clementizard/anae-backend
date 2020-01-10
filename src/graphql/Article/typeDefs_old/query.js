import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		getArticles: [Article]
		"""
			Get one article informations
		"""
		getArticle(id: String!): Article
		"""
			Get paginated articles.
			first: number of returned articles. after: the first _id of the wanted article
		"""
		getSomeArticles(first: Int, after: String): [Article]
	}
`;
