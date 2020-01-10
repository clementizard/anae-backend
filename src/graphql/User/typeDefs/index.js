import { gql } from 'apollo-server-express';

import Mutation from './mutation';
import Query from './query';

export default gql`
	type User {
		id: ID!
    email: String!
		password: String!
	}
	type Token {
		success: Boolean!
		message: String
		token: String
	}
	${Query}
	${Mutation}
`;
