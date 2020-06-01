const http = require('http');
const fs = require('fs');
const path = require('path');

const requestListener = function (req, res) {
  console.log('Hitting: 🔗', req.url);
  const [_, path] = req.url.split('/pathcheck?path=');
  if (path) {
    fs.access(path, fs.constants.OK | fs.constants.R_OK, err => {
      console.log(`Was ${path} found and readable..: ${err ? 'No, with error '.concat(err.message) : 'Yes'} `);
    });
  }
  res.writeHead(200);
  res.end('Hello, from the other side!!! Again');
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3000, () => {
  console.log('Server up and running...');
});

