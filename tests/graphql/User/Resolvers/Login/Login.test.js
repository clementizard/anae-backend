/* eslint import/first:0 */
require('dotenv').config();

import test from 'ava';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';

import { schema } from '../../../../../src/graphql';
import { getUserInfosByToken } from '../../../../../src/graphql/User/Tools';
import InitVariables from '../Init/variables';
import Variables from './variables';
import {
	cleanTest,
	mutateInit,
	mutateRegister,
	mutateLogin,
} from '../Tools';

test('Login', async (t) => {
	// Init Apollo Server
	const server = new ApolloServer({
		schema,
		context: () => ({
			userId: Variables.user.id,
			deviceId: Variables.device.id,
		}),
	});
	const { mutate } = createTestClient(server);

	// Login without init
	const nullRes = await mutateLogin(mutate, {
		email: Variables.user.email,
		password: Variables.user.password,
	});
	t.deepEqual(nullRes, {}, 'Login without init');

	// Init a new user
	const { userId, deviceId } = await mutateInit(mutate, { ...Variables.device });
	if (!userId || !deviceId) t.fail('Init a new User');
	Variables.setUserId(userId);
	Variables.setDeviceId(deviceId);

	// Register user
	const { roles: regAuthScope } = await mutateRegister(mutate, {
		email: Variables.user.email,
		password: Variables.user.password,
	});
	t.deepEqual(regAuthScope, ['CLIENT'], 'Register user');

	// Login user
	const token = await mutateLogin(mutate, {
		email: Variables.user.email,
		password: Variables.user.password,
	});
	const { roles: logAuthScope } = await getUserInfosByToken(token);
	t.deepEqual(logAuthScope, ['CLIENT'], 'Login user');

	// Login Unknown user
	const resultUnknown = await mutateLogin(mutate, {
		email: `unknown${Variables.user.email}`,
		password: Variables.user.password,
	});
	t.deepEqual(resultUnknown, {}, 'Login Unknown user');

	// Login Bad Credential
	const resultBadCred = await mutateLogin(mutate, {
		email: Variables.user.email,
		password: `unknown${Variables.user.password}`,
	});
	t.deepEqual(resultBadCred, {}, 'Login Bad Credential');

	await cleanTest({
		id: [
			userId,
			deviceId,
		],
		ipv4: [InitVariables.connection.ipv4],
	});
	t.pass();
});
