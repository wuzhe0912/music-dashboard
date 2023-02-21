module.exports = function errorHandle(res) {
  console.log('errorHandle', res);
  const headers = {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: 'error',
      message: 'Not Found',
    }),
  );
  res.end();
};
