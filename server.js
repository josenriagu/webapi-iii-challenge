const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);

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
