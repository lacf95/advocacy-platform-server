const response = require('../lib/response.js');
const facebookSource = require('../sources/facebook.js');
const accessTokenMutation = require('../mutations/access-token.js');

module.exports.getLongLivedAccessToken = async (query) => {
  try {
    const longLivedAccessToken = await facebookSource.getLongLivedAccessToken(query || {});
    return response(accessTokenMutation.mutate(longLivedAccessToken));
  } catch (err) {
    return response(err.name, 500);
  }
};
