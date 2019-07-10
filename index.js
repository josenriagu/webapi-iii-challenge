// code away!
const port = 5000
const server = require('./server.js');

server.listen(port, () => {
   console.log(`\n* Awesome!! *\n* Server Running on http://localhost:${port} *\n`);
});
