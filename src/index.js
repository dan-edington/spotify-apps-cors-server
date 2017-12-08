const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = config.PORT;

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

});

require('./routes')(app);

app.listen(port, () => {

  console.log(`Listening on http://localhost:${port}`);

});
