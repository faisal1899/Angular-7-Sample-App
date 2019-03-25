const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/'});

const app = express();

const PORT = process.env.PORT || 3030;

function enableCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // next();
  setTimeout(next, 1000);
}

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    return res.sendStatus(204);
  }
  next();
}

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(enableCors);
app.use(ignoreFavicon);

app.get('/', (req, res) => {
  res.json({ msg: "Hello there"});
});

require('./routes/register')(app);

// app.use(express.static('data'));

app.all('/api/*', (req, res) => {

  console.log('req.body ===>>> ', req.body);

  const dataFile = req.params[0].split('/').pop();
  if (dataFile) {
    res.sendFile(path.join(__dirname, 'data', `${dataFile}.json`));
  }
});

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
