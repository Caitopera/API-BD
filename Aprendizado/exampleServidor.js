const http = require('http');
const port = 3000 // process.env.PORT --> Pega a porta que está rodando na aplicação

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(port);

/*const server =  http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type' : 'text-plain'})
  res.write('Hello World\n')
  res.end('Tchau')
})
*/