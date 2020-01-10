/* eslint import/first:0 */
require('dotenv').config();

import test from 'ava';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';

import { schema } from '../../../../../src/graphql';
import InitVariables from '../Init/variables';
import Variables from './variables';
import {
	cleanTest,
	mutateInit,
	mutateRegister,
} from '../Tools';

test('Register', async (t) => {
	// Init Apollo Server
	const server = new ApolloServer({
		schema,
		context: () => ({
			userId: Variables.user.id,
			deviceId: Variables.device.id,
		}),
	});
	const { mutate } = createTestClient(server);

	// Cannot register without Init
	const emptyRes = await mutateRegister(mutate, {
		email: Variables.user.email,
		password: Variables.user.password,
	});
	t.deepEqual(emptyRes, {}, 'Cannot register without Init');

	// Init a new user
	const { userId, deviceId } = await mutateInit(mutate, { ...Variables.device });
	if (!userId || !deviceId) t.fail('Init a new User');

	Variables.setUserId(userId);
	Variables.setDeviceId(deviceId);

	// Register this user
	const { roles } = await mutateRegister(mutate, {
		email: Variables.user.email,
		password: Variables.user.password,
		firstname: Variables.user.firstname,
		lastname: Variables.user.lastname,
	});
	t.deepEqual(roles, ['CLIENT'], 'Register this user');

	// Cannot register twice
	const result = await mutateRegister(mutate, {
		email: Variables.user.email,
		password: Variables.user.password,
	});
	t.deepEqual(result, {}, 'Cannot register twice');

	await cleanTest({
		id: [
			userId,
			deviceId,
		],
		ipv4: [ InitVariables.connection.ipv4 ],
	});
	t.pass();
});
