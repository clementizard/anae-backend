import { gql } from 'apollo-server-express';

import Mutation from './mutation';
import Query from './query';

export default gql`
	type InstaPostSnapshot {
    date: DATE
    comments: Int
    likes: Int
  }

  type InstaAccountSnapshot {
    date: DATE
    followers: Int
    following: Int
    comments: Int
    likes: Int
    posts: Int
    engagement: Float
    frequency: Int # Minutes
  }
  type InstaAccountPost {
	  postId: String
    postType: String
    media: String
    text: String
    hashtags: [String]
		snapshots: [InstaPostSnapshot]
  }
  
  type InstaAccount {
    id: ID!
    userId: String
    email: String
    username: String
    fullName: String
    description: String
    url: String
    website: String
    lastUpdate: DATE
    snapshots: [InstaAccountSnapshot]
    posts: [InstaAccountPost]
  }
  ${Query}
	${Mutation}
`;
