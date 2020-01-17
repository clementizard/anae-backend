import { neo4jgraphql } from 'neo4j-graphql-js';

/*
		ADMIN
 		CLIENT
		PRODUCT_MANAGER
		MODERATOR
		REDACTOR
*/

export const ADMIN = { name: 'ADMIN' };
export const REDACTOR = { name: 'REDACTOR' };
export const PRODUCT_MANAGER = { name: 'PRODUCT_MANAGER' };
export const MODERATOR = { name: 'MODERATOR' };
export const CLIENT = { name: 'CLIENT' };

export const authFilter = entities => async (obj, params, ctx, resInf) => {
	const { roles, userId } = ctx;

	if (!userId) return null;
	if (!entities.length) return neo4jgraphql(obj, params, ctx, resInf);
	// Verifier que les roles est dans entities, si celui-ci est precise
	// Filtrer les params selon les fields.
	// Les retours sont filtres automatiquement dans les typedefs
	const allAllowedFields = ['id'];
	let isAllowed = false;
	let fullAccess = false;
	entities.forEach(({ name, allowedFields = [], includes = [] }) => {
		if (roles.includes(name)) {
			isAllowed = true;
			allowedFields.forEach((field) => {
				if (allAllowedFields.indexOf(field) === -1) allAllowedFields.push(field);
			});
			includes.forEach((entityName) => {
				entities.find(el => el.name === entityName).allowedFields.forEach((field) => {
					if (allAllowedFields.indexOf(field) === -1) allAllowedFields.push(field);
				});
			});
			if (!allowedFields.length && !includes.length) fullAccess = true;
		}
	});
	if (!isAllowed) return null;
	if (fullAccess) return neo4jgraphql(obj, params, ctx, resInf);
	const finalParams = {};
	Object.keys(params).forEach((key) => {
		if (allAllowedFields.includes(key)) finalParams[key] = params[key];
	});
	return neo4jgraphql(obj, finalParams, ctx, resInf);
};
