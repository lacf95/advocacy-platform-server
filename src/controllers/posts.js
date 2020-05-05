const response = require('../lib/response.js');
const facebookSource = require('../sources/facebook.js');
const postMutation = require('../mutations/post.js');

module.exports.getPosts = async (query) => {
  try {
    const posts = await facebookSource.getPosts(query || {});
    return response(postMutation.mutateList(posts));
  } catch (err) {
    return response(err.name, 500);
  }
};
