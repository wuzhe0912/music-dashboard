const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./components/errorHandle');

const uuid = uuidv4();
const todos = [];

const requestListener = async (req, res) => {
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
      try {
        const title = JSON.parse(body).title;
        if (title) {
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
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }
    });
  } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    const itemIndex = todos.findIndex((todo) => todo.id === id);
    if (itemIndex !== -1) {
      todos.splice(itemIndex, 1);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: 'success',
          data: todos,
        }),
      );
      res.end();
    } else {
      await errorHandle(res);
    }
  } else if (req.url === '/todos' && req.method === 'DELETE') {
    todos.length = 0;
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        data: todos,
      }),
    );
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
