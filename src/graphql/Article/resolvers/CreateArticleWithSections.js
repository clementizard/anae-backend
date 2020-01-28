import { session } from 'Neo4j';

const articleAllowedParams = [
	'title',
	'image',
	'description',
];
const sectionAllowedParams = [
	'title',
	'image',
	'text',
	'size',
];

export default async (obj, params, ctx) => {
	if (!ctx.roles.includes('ADMIN') && !ctx.roles.includes('REDACTOR')) return null;
	const { sections } = params;
	let createSectionsQuery = '';
	const sectionQueryParams = {};
	const relationshipQueryParams = {};

	// Article
	let articleParams = '';
	Object.keys(params).forEach((key) => {
		if (articleAllowedParams.includes(key)) articleParams += `${key}: $${key}, `;
	});
	// Sections
	if (sections && sections.length) {
		sections.forEach((section, sectionIndex) => {
			let sectionParams = '';
			Object.keys(section).forEach((key) => {
				if (sectionAllowedParams.includes(key)) {
					sectionQueryParams[`section${sectionIndex}${key}`] = section[key];
					sectionParams += `${key}: $section${sectionIndex}${key}, `;
				}
			});
			createSectionsQuery += `CREATE (s${sectionIndex}:Section { ${sectionParams} id: apoc.create.uuid() })`;
			// Relationship
			relationshipQueryParams[`r${sectionIndex}`] = Boolean(section.disposable);
			createSectionsQuery += `CREATE (s${sectionIndex})-[r${sectionIndex}:IN_ARTICLE { disposable: $r${sectionIndex} }]->(n)`;
		});
	}
	const finalQuery = `
					CREATE (n:Article { ${articleParams}id: apoc.create.uuid() })
					${createSectionsQuery}
					RETURN n
				`;
	const result = await session.run(finalQuery, {
		...params,
		...sectionQueryParams,
		...relationshipQueryParams,
	});
	return result.records[0]._fields[0].properties;
};
