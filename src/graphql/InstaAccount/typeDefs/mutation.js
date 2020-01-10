import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addInstaAccount(username: String!): InstaAccount
    updateInstaAccount(username: String!): InstaAccount
    deleteInstaAccount(username: String!): Boolean
    consoleArgs(test: String): Boolean
  }
`;
