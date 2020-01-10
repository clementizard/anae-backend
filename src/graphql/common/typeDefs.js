import { gql } from 'apollo-server-express';

const typeDef = gql`
  scalar DATE

  type Query
  type Mutation
`;

export default typeDef;
