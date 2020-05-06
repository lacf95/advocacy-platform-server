module.exports = (message, statusCode = 200) => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify({
    message,
    statusCode,
  }, null, 2),
});
