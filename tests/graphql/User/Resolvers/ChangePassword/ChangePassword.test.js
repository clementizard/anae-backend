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
	mutateChangePassword,
} from '../Tools';

test('ChangePassword', async (t) => {
	// Init Apollo Server
	const server = new ApolloServer({
		schema,
		context: () => ({
			userId: Variables.user1.id,
			deviceId: Variables.device.id,
			roles: Variables.user1.roles,
			headers: { authorization: Variables.token },
		}),
	});
	const { mutate } = createTestClient(server);

	// Init user 1
	const { userId: user1Id, deviceId: device1Id, token: initToken } = await mutateInit(mutate, { ...Variables.device });
	if (!user1Id || !device1Id) t.fail('Init user 1');

	Variables.setUser1Id(user1Id);
	Variables.setDeviceId(device1Id);
	Variables.token = initToken;

	// Register user 1
	const { roles, token: registerToken } = await mutateRegister(mutate, {
		email: Variables.user1.email,
		password: Variables.user1.password,
	});
	t.deepEqual(roles, ['CLIENT'], 'Register user 1');

	const oldPassword = Variables.user1.password;
	Variables.token = registerToken;
	Variables.changePassword();
	Variables.setUser1Roles(roles);

	// Change user1 Password
	const { success } = await mutateChangePassword(mutate, {
		email: Variables.user1.email,
		oldPassword,
		newPassword: Variables.user1.password,
	});
	t.is(success, true, 'Change user1 Password');

	// Init user 2
	const { userId: user2Id, token: initToken2, deviceId: device2Id } = await mutateInit(mutate, { ...Variables.device });
	if (!user2Id) t.fail('Init user 2');

	Variables.setUser1Id(user2Id);
	Variables.setDeviceId(device2Id);
	Variables.token = initToken2;

	// Register user 2
	const { roles: roles2, token: registerToken2 } = await mutateRegister(mutate, {
		email: Variables.user2.email,
		password: Variables.user2.password,
	});
	t.deepEqual(roles2, ['CLIENT'], 'Register user 2');

	Variables.setUser1Roles(roles2);
	Variables.token = registerToken2;

	// Change Password of other user
	const { success: success2 } = await mutateChangePassword(mutate, {
		email: Variables.user1.email,
		oldPassword: Variables.user1.password,
		newPassword: 'hackedPassword',
	});
	t.is(success2, undefined, 'Change Password of other user');

	await cleanTest({
		id: [
			user1Id,
			user2Id,
			device1Id,
			device2Id,
		],
		ipv4: [InitVariables.connection.ipv4],
	});
});
