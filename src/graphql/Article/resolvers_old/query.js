import { Article } from '../../../mongodb/models';

// https://codeburst.io/graphql-pagination-by-example-part-2-2803802ef23a
export default {
	getArticles: async () => await Article.find({}).exec(),
	getArticle: async (_, { id }) => await Article.findById(id).exec(),
	getSomeArticles: async (_, { from, after }) => {
		console.log('GET SOME ARTICLES: ', from, after);
		return await Article.find({}).exec();
	},
};
/*
query getArticle {
  getArticle(id: "5d949e13c31d83415c1bd39b") {
    title
    description
    created
  }
}

query getArticles {
  getArticles {
    title
    sections {
      title
    }
  }
}
* */
