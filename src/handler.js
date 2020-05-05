const postsController = require('./controllers/posts.js');
const accessTokensController = require('./controllers/access-tokens.js');

module.exports.getPosts = async ({ queryStringParameters: query }) => (
  postsController.getPosts(query)
);

module.exports.getLongLivedAccessToken = async ({ queryStringParameters: query }) => (
  accessTokensController.getLongLivedAccessToken(query)
);
