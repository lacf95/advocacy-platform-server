const got = require('got');

const graphApi = got.extend({
  prefixUrl: process.env.FACEBOOK_GRAPH_API_URL,
  responseType: 'json',
});

const authApi = got.extend({
  prefixUrl: process.env.FACEBOOK_AUTH_API_URL,
  responseType: 'json',
});

const buildFieldsParams = () => {
  const params = [
    'id',
    'created_time',
    'message',
    'reactions.limit(0).summary(true)',
    'comments{id,message,created_time,reactions.limit(0).summary(true)}',
  ];

  return params.join(',');
};

const getPosts = async ({ groupId, accessToken, since }) => {
  const searchParams = new URLSearchParams([
    ['access_token', accessToken],
    ['fields', buildFieldsParams()],
    ['transport', 'cors'],
  ]);

  if (since && since !== 'all') {
    searchParams.append('since', since);
  }

  const { body } = await graphApi(`${groupId}/feed`, { searchParams });
  return body.data;
};

const getLongLivedAccessToken = async ({ accessToken }) => {
  const searchParams = new URLSearchParams([
    ['grant_type', 'fb_exchange_token'],
    ['client_id', process.env.FACEBOOK_APP_ID],
    ['client_secret', process.env.FACEBOOK_APP_SECRET_KEY],
    ['fb_exchange_token', accessToken],
  ]);

  const { body } = await authApi('access_token?', { searchParams });
  return body;
};

module.exports = {
  getPosts,
  getLongLivedAccessToken,
};
