import { neo4jgraphql } from 'neo4j-graphql-js';

/*
		ADMIN
 		CLIENT
		PRODUCT_MANAGER
		MODERATOR
		REDACTOR
*/


export const authFilter = entities => async (obj, params, ctx, resInf) => {
	const { roles } = ctx;

	// Verifier que les roles est dans entities, si celui-ci est precise
	// Filtrer les params selon les fields.
	// Les retours sont filtres automatiquement dans les typedefs
	const allAllowedFields = ['id'];
	let isAllowed = false;
	entities.forEach(({ name, allowedFields, includes = [] }) => {
		if (roles.includes(name)) {
			allowedFields.forEach((field) => {
				if (allAllowedFields.indexOf(field) === -1) allAllowedFields.push(field);
			});
			includes.forEach((entityName) => {
				entities.find(el => el.name === entityName).allowedFields.forEach((field) => {
					if (allAllowedFields.indexOf(field) === -1) allAllowedFields.push(field);
				});
			});
			isAllowed = true;
		}
	});
	if (!isAllowed) return null;
	const finalParams = {};
	Object.keys(params).forEach((key) => {
		if (allAllowedFields.includes(key)) finalParams[key] = params[key];
	});
	return neo4jgraphql(obj, finalParams, ctx, resInf);;
};
