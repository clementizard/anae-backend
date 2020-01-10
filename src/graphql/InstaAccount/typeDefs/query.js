import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllInstaAccountsInfos: [InstaAccount]
    getInstaAccount(username: String!): InstaAccount
	}
`;
