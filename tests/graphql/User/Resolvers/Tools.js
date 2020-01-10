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
            $width: Int
            $height: Int
            $type: String
            $browser: String
            $name: String
        ) {
            Init(
                deviceId: $deviceId
                width: $width
                height: $height
                type: $type
                browser: $browser
                name: $name
            ) {
                success
                message
                token
            }
        }
		`,
		variables,
	});
	if (result.errors || !result.data.Init.success) return {};
	const { token } = result.data.Init;
	return jwt.verify(token, process.env.JWT_SECRET);
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
