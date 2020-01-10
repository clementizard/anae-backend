import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        addUser(email: String!, password: String!): User
        getToken(email: String!, password: String!): Token
    }
`;
