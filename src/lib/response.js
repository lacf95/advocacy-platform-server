module.exports = (message, statusCode = 200) => ({
  statusCode: 200,
  body: JSON.stringify({
    message,
    statusCode,
  }, null, 2),
});
