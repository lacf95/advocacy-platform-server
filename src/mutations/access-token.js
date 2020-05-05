const camelcaseKeys = require('camelcase-keys');

const mutate = (accessToken) => camelcaseKeys(accessToken, { deep: true });

module.exports = {
  mutate,
};
