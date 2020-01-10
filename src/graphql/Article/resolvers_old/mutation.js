import { Article } from '../../../mongodb/models';

// eslint-disable-next-line max-len
const specialChars = ['!', '?', ',', '\'', '"', '%', '_', '(', ')', '[', ']', '{', '}', '*', '&', '^', '#', '~', '<', '>', '/', '\\', '+', '.'];

const formatTitleToId = (title) => {
	let titleId = '';

	for (let i = 0; i < title.length; i++) {
		titleId += title[i] === ' ' ? '-' : specialChars.includes(title[i]) ? '' : title[i];
	}
	titleId[titleId.length - 1] = titleId[titleId.length - 1] === '-' ? '' : titleId[titleId.length - 1];
	return titleId;
};

// https://www.apollographql.com/docs/apollo-server/api/apollo-server/
export default {
	addArticle: async (_, args) => {
		try {
			return await Article.create({
				...args,
				created: Date.now(),
				titleId: formatTitleToId(args.title),
			});
		} catch (e) {
			return e.message;
		}
	},
};

/*
mutation addArticle {
  addArticle (
    title: "Article 3 is a question ?"
    image: "Article Image"
    description: "Art 3 Desc"
    sections: [{
      title: "Main"
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus mi, venenatis vel porta eget, tincidunt vitae ipsum. Cras viverra tellus et egestas dictum."
    }]
  ){
    titleId
    title
    created
  }
}
* */
