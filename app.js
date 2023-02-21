const http = require('http');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();
const todos = [];

const requestListener = function (req, res) {
  const headers = {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  if (req.url === '/todos' && req.method === 'GET') {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        data: todos,
      }),
    );
    res.end();
  } else if (req.url === '/todos' && req.method === 'POST') {
    req.on('end', () => {
      const title = JSON.parse(body).title;
      const item = {
        id: uuid,
        title: title,
      };
      todos.push(item);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: 'success',
          data: todos,
        }),
      );
      res.end();
    });
  } else if (req.url === '/' && req.method === 'DELETE') {
    res.writeHead(200, headers);
    res.write('Delete is Success');
    res.end();
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: 'false',
        message: 'Page not found',
      }),
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
const PORT = 3000;
server.listen(PORT);
