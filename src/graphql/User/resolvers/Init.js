import requestIp from 'request-ip';

import { session } from '../../../neo4j/config';
import {
	getFormattedResult,
	getDeviceQueryByInfos,
	hasRecords,
	generateToken,
	genericError,
} from './Tools';
import Variables from '../../../../tests/graphql/User/Resolvers/Init/variables';

// Called during first load
export default async (obj, params, ctx, resInf) => {
	// If user created, create links to Device / Connection
	const {
		deviceId,
		...deviceInfos
	} = params;
	const deviceInfosQuery = getDeviceQueryByInfos(deviceInfos);
	const ip = process.env.NODE_ENV !== 'test' ? requestIp.getClientIp(ctx.req) : Variables.connection.ipv4;
	const now = new Date().toISOString();

	// Get device by ID or create it with params
	const deviceQ = deviceId ? `id: "${deviceId}"` : deviceInfosQuery;
	// Best case scenario: both device and connection is found, and an unregistered user is found.
	const userDeviceConnectionQ = `
		MATCH (d:Device {${deviceQ}})<-[:USED]-(u:User)-[:CONNECTED_WITH]->(:Connection {ipv4: "${ip}"})
		WHERE u.email IS NULL
		RETURN u.id AS userId, d.id as existingDeviceId
	`;
	const userResult = await session.run(userDeviceConnectionQ);
	if (hasRecords(userResult)) {
		// Records found, setting userId in jwt.
		const { userId, existingDeviceId } = getFormattedResult(userResult);
		return generateToken(userId, existingDeviceId);
	}
	if (deviceId) {
		// Check for given device.
		const userDeviceQ = `
					MATCH (:Device {id: "${deviceId}"})<-[:USED]-(u:User)
					WHERE u.email IS NULL
					RETURN u.id AS userId
				`;
		const deviceResult = await session.run(userDeviceQ);
		if (hasRecords(deviceResult)) {
			const { userId } = getFormattedResult(deviceResult);
			// Device and User exist, checking if connection already exist too
			// Create link to connection if existing, creating connection and link otherwise
			// Create String
			let createConnection = `
					MATCH (:Device {id: "${deviceId}"})<-[:USED]-(u:User {id: "${userId}"})
					CREATE (u)-[:CONNECTED_WITH {lastDate: "${now}"}]->(c:Connection {ipv4: "${ip}", id: apoc.create.uuid()})
					RETURN c
				`;
			const matchConnectionRes = await session.run(`MATCH (c:Connection {ipv4: "${ip}"}) RETURN c.id AS connectionId`);
			if (hasRecords(matchConnectionRes)) {
				const { connectionId } = getFormattedResult(matchConnectionRes);
				// Connection already exist, creating link to user
				createConnection = `
					MATCH (:Device {id: "${deviceId}"})<-[:USED]-(u:User {id: "${userId}"}), (c:Connection {id: "${connectionId}"})
					WITH u, c
					CREATE (u)-[:CONNECTED_WITH {lastDate: "${now}"}]->(c)
					RETURN c
				`;
			}
			const connectionResult = await session.run(createConnection);
			if (!hasRecords(connectionResult)) return genericError;
			return generateToken(userId, deviceId);
		}
		// GIVEN DEVICE MAY EXIST, RELATED TO A REGISTERED USER.
		// Todo: Link this device to an unregistered user with this connection.
		// Until then, create a new device.
		console.log('Given device does not exist, ignoring');
	}
	// Check for existing connection
	const userConnectionQ = `
		MATCH (u:User)-[:CONNECTED_WITH]->(c:Connection {ipv4: "${ip}"})
		WHERE u.email IS NULL
		RETURN u.id AS userId, c.id as connectionId
	`;
	const userConnectionResult = await session.run(userConnectionQ); // CAN BE MULTIPLE
	if (hasRecords(userConnectionResult)) {
		const { userId } = getFormattedResult(userConnectionResult);
		// User found with Connection, creating new Device.
		const createDevice = `
			MATCH (u:User {id: "${userId}"})
			MERGE (d:Device {${deviceInfosQuery}, id: apoc.create.uuid()})<-[:USED {lastDate: "${now}"}]-(u)
			RETURN d.id AS newDeviceId
		`;
		const deviceResult = await session.run(createDevice);
		if (hasRecords(deviceResult)) {
			const { newDeviceId } = getFormattedResult(deviceResult);
			return generateToken(userId, newDeviceId);
		}
	}
	// Connection and Device are new, creating with a new user.
	const userCreateQ = `
		CREATE (d:Device {${deviceInfosQuery}, id: apoc.create.uuid() })<-[:USED {lastDate: "${now}"}]-(u:User {createdAt: "${now}", id: apoc.create.uuid() })-[:CONNECTED_WITH {lastDate: "${now}"}]->(:Connection {ipv4: "${ip}", id: apoc.create.uuid()})
		RETURN d.id as newDeviceId, u.id as userId
	`;
	const userCreateResult = await session.run(userCreateQ);
	if (!hasRecords(userCreateResult)) return genericError;
	const { userId, newDeviceId } = getFormattedResult(userCreateResult);
	return generateToken(userId, newDeviceId);
};
