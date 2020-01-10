#!/usr/bin/env node

/* eslint import/first:0 */
import Dotenv from 'dotenv';

Dotenv.config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';

import GraphQLConfig from './graphql';

require('./mongodb/config');
require('./InstaAnalytics/tasks/index');

// https://www.robinwieruch.de/graphql-apollo-server-tutorial/
// https://github.com/lucasconstantino/graphql-resolvers/blob/HEAD/docs/API.md
// https://medium.com/@mpreziuso/password-hashing-pbkdf2-scrypt-bcrypt-and-argon2-e25aaf41598e
const server = new ApolloServer(GraphQLConfig);
const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
server.applyMiddleware({ app });

if (process.env.NODE_ENV !== 'test') {
	app.listen(
		{ port },
		() => console.log(chalk.keyword('orange')(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)));
}

export default app;
