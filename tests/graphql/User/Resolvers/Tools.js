import { gql } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { session } from '../../../../src/neo4j/config';

export const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export const mutateInit = async (mutate, variables) => {
	const result = await mutate({
		mutation: gql`
        mutation Init(
            $deviceId: String
            $type: String
            $brand: String
            $model: String
            $width: Int
            $height: Int
            $clientType: String
            $clientName: String
            $clientVersion: String
            $clientEngine: String
            $clientEngineVersion: String
            $osName: String
            $osVersion: String
            $osPlatform: String
            $botName: String
            $botCategory: String
            $botUrl: String
            $botProducerName: String
            $botProducerUrl: String
        ) {
            Init(
                deviceId: $deviceId
                type: $type
                brand: $brand
                model: $model
                width: $width
                height: $height
                clientType: $clientType
                clientName: $clientName
                clientVersion: $clientVersion
                clientEngine: $clientEngine
                clientEngineVersion: $clientEngineVersion
                osName: $osName
                osVersion: $osVersion
                osPlatform: $osPlatform
                botName: $botName
                botCategory: $botCategory
                botUrl: $botUrl
                botProducerName: $botProducerName
                botProducerUrl: $botProducerUrl
            ) {
                success
                message
                token
            }
        }
		`,
		variables,
	});
	if (!result || result.errors || result.data.Init === null || !result.data.Init.success) return {};
	const { token } = result.data.Init;
	return { token, ...jwt.verify(token, process.env.JWT_SECRET) };
};

export const mutateRegister = async (mutate, variables) => {
	const result = await mutate({
		mutation: gql`
        mutation Register(
            $email: String!
            $password: String!
            $firstname: String
            $lastname: String
        ) {
            Register(
                email: $email
                password: $password
                firstname: $firstname
                lastname: $lastname
            ) {
                success
                message
                token
            }
        }
		`,
		variables,
	});
	if (!result || result.errors || result.data.Register === null || !result.data.Register.success) return {};
	const { token } = result.data.Register;
	return { ...jwt.verify(token, process.env.JWT_SECRET), token };
};

export const mutateLogin = async (mutate, variables) => {
	const result = await mutate({
		mutation: gql`
        mutation Login(
            $email: String!
            $password: String!
        ) {
            Login(
                email: $email
                password: $password
            ) {
                success
                message
                token
            }
        }
		`,
		variables,
	});
	if (!result || result.errors || result.data.Login === null || !result.data.Login.success) return {};
	const { token } = result.data.Login;
	return token;
};
export const mutateChangePassword = async (mutate, variables) => {
	const result = await mutate({
		mutation: gql`
        mutation ChangePassword(
            $email: String!
            $oldPassword: String!
            $newPassword: String!
        ) {
            ChangePassword(
                email: $email
                oldPassword: $oldPassword
		            newPassword: $newPassword
            ) {
                success
                message
            }
        }
		`,
		variables,
	});
	if (!result || result.errors || result.data.ChangePassword === null) return {};
	return result.data.ChangePassword;
};


export const cleanTest = async (clean) => {
	await asyncForEach(Object.keys(clean), async (key) => {
		let toDelete = '';
		let deleteNodes = '';
		clean[key].forEach((value, i) => {
			const comma = i ? ', ' : '';
			toDelete += `${comma}(n${i} {${key}: "${value}"})`;
			deleteNodes += `${comma}n${i}`;
		});
		await session.run(`MATCH ${toDelete} DETACH DELETE ${deleteNodes}`);
	});
};
