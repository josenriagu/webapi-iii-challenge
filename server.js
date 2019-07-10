// import express module
const express = require('express');
// import routers
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

// define server
const server = express();

// tell server what to use, including middlewares for this level
// express json
server.use(express.json());
// custom middleware - logger;
server.use(logger);
// base endpoints
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const date = new Date();
  console.log(`Shebang!! you made a ${req.method} request to ${req.url} on ${date}`)
  next();
};

module.exports = server;
