const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./components/errorHandle');

const todos = [];
const headers = {
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json',
};

const writeResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, headers);
  res.write(
    JSON.stringify({
      status: 'success',
      data: data,
    }),
  );
  res.end();
};

const successResponse = (res, data) => {
  writeResponse(res, 200, data);
};

const errorResponse = (res) => {
  writeResponse(res, 404, {
    status: 'false',
    message: 'Page not found',
  });
};

const getTodos = (req, res) => {
  successResponse(res, todos);
};

const postTodos = (req, res, body) => {
  try {
    const title = JSON.parse(body).title;
    const uuid = uuidv4();
    if (title) {
      const item = {
        id: uuid,
        title: title,
      };
      todos.push(item);
      successResponse(res, todos);
    } else {
      errorHandle(res);
    }
  } catch (error) {
    errorHandle(res);
  }
};

const patchTodos = (req, res, body) => {
  try {
    const id = req.url.split('/')[2];
    const title = JSON.parse(body).title;
    const itemIndex = todos.findIndex((element) => element.id === id);
    if (itemIndex !== -1) {
      todos[itemIndex].title = title;
    } else {
      errorHandle(res);
    }
    successResponse(res, todos);
  } catch (error) {
    errorHandle(res);
  }
};

const deleteTodos = (req, res) => {
  const id = req.url.split('/')[2];
  const itemIndex = todos.findIndex((todo) => todo.id === id);
  if (itemIndex !== -1) {
    todos.splice(itemIndex, 1);
    successResponse(res, todos);
  } else {
    errorHandle(res);
  }
};

const deleteAllTodos = (req, res) => {
  todos.length = 0;
  successResponse(res, todos);
};

const options = (req, res) => {
  writeResponse(res, 200, {});
};

const requestListener = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  if (req.url === '/todos' && req.method === 'GET') {
    getTodos(req, res);
  } else if (req.url === '/todos' && req.method === 'POST') {
    req.on('end', () => {
      postTodos(req, res, body);
    });
  } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
    deleteTodos(req, res);
  } else if (req.url.startsWith('/todos/') && req.method === 'PATCH') {
    req.on('end', () => {
      patchTodos(req, res, body);
    });
  } else if (req.url === '/todos' && req.method === 'DELETE') {
    deleteAllTodos(req, res);
  } else if (req.method === 'OPTIONS') {
    options(req, res);
  } else {
    errorResponse(res);
  }
};

const server = http.createServer(requestListener);
const PORT = 3005;
server.listen(PORT);
