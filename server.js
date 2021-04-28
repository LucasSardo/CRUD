const http = require('http');
const app = require('./app');
const port = process.env.PORT ||3000;
const server = http.createServer(app);
//INICIAR O SERVIDOR
//app.listen(process.env.PORT || 3000);

server.listen(port);
