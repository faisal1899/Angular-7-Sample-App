const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

app.use(morgan('combined')); // morgan is used to logging http request related data to the console.
app.use(bodyParser.json({ type: '*/*'})); // parse all type of request to josn.
router(app);

const port =  process.env.PORT || 3090;
const server = http.createServer(app); // register app with http server.
server.listen(port);
console.log('Listening on port: ', port);
