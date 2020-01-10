import { gql } from 'apollo-server-express';

import Mutation from './mutation';
import Query from './query';

export default gql`
  type User {
    id: ID!
    userName: String
    email: String
  }
  ${Query}
	${Mutation}
`;
