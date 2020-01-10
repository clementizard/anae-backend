import { gql } from 'apollo-server-express';

export default gql`
	input SectionInput {
		title: String
		text: String
		image: String
		size: Int
		disposable: Boolean
	}

	extend type Mutation {
		addArticle(
      title: String!
      image: String!
      description: String
      sections: [SectionInput]
    ): Article
	}
`;
