import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    addUser(userName: String!, email: String!): User
  }
`;
