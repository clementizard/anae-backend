/* eslint-disable max-len */
/* eslint import/first:0 */
require('dotenv').config();

import test from 'ava';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';

import { schema } from '../../../../../src/graphql';
import Variables from './variables';
import {
	cleanTest,
	mutateInit,
} from '../Tools';

// Init Apollo Server
test.before(async (t) => {
	const server = new ApolloServer({ schema });
	const { mutate, query } = createTestClient(server);
	t.context.mutate = mutate;
	t.context.query = query;
});

test('Init', async (t) => {
	const { mutate } = t.context;

	// Create a new user
	const firstIp = `${Variables.connection.ipv4}`;
	const {
		userId: user1Id,
		deviceId: user1Device1Id,
	} = await mutateInit(mutate, { ...Variables.device });
	if (!user1Id) t.fail();

	// Check if user has been created
	const {
		userId: userIdByDevice,
		deviceId: userByDeviceId,
	} = await mutateInit(mutate, { deviceId: user1Device1Id });
	if (!userIdByDevice) t.fail();
	t.is(user1Id, userIdByDevice);
	t.is(user1Device1Id, userByDeviceId);

	Variables.changeIp();
	const secondIp = `${Variables.connection.ipv4}`;

	// Link another IP to user
	const {
		userId: userIdByDeviceChangedIp,
		deviceId: userByDeviceIdChangedIp,
	} = await mutateInit(mutate, { deviceId: user1Device1Id });
	if (!userIdByDeviceChangedIp) t.fail();
	t.is(user1Id, userIdByDeviceChangedIp);
	t.is(user1Device1Id, userByDeviceIdChangedIp);

	Variables.setIp(firstIp);
	Variables.changeDevice();

	// Link another device to user
	const { userId: userIdByConnection, deviceId: user1device2Id } = await mutateInit(mutate, { ...Variables.device });
	if (!userIdByConnection) t.fail();
	t.is(user1Id, userIdByConnection);

	Variables.changeDevice();
	Variables.changeIp();
	const thirdIp = `${Variables.connection.ipv4}`;

	// Create another user
	const { userId: user2Id, deviceId: user2Device1Id } = await mutateInit(mutate, { ...Variables.device });
	if (!user2Id) t.fail();

	// Check user existence after cleaning his cache
	const {
		userId: user2IdByConnection,
		deviceId: user2Device1IdByConnection,
	} = await mutateInit(mutate, { ...Variables.device });
	if (!user2Device1IdByConnection) t.fail();
	t.is.skip(user2Device1Id, user2Device1IdByConnection);

	Variables.setIp(firstIp);

	// Check user link to alreading existing ip
	const {
		userId: user2IdByExistingConnection,
	} = await mutateInit(mutate, { deviceId: user2Device1Id });
	if (!user2IdByConnection) t.fail();
	t.is(user2Id, user2IdByExistingConnection);

	await cleanTest({
		id: [
			user1Id,
			user2Id,
			user1Device1Id,
			user1device2Id,
			user2Device1Id,
		],
		ipv4: [
			firstIp,
			secondIp,
			thirdIp,
		],
	});
	t.pass();
});
