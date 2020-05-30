const http = require('http');

const requestListener = function (req, res) {
  console.log('Hitting: ', req.url);
  res.writeHead(200);
  res.end('Hello, from the other side!!!');
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3000, () => {
  console.log('Server up and running...');
});

