const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');

const app = express();
const port = config.PORT;

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

});

app.post('/setlist.fm/searchSetlists', (req, res) => {

  const SETLIST_API_KEY = config.SETLIST_API_KEY;

  axios({
    method: 'get',
    url: 'https://api.setlist.fm/rest/1.0/search/setlists',
    params: {
      artistName: req.body.artistName,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'x-api-key': SETLIST_API_KEY,
    },
  }).then((response) => {

    res.send(response.data);

  }).catch((error) => {

    console.log(error);

  });

});

app.post('/spotify/getAuthToken', (req, res) => {
  
  const SPOTIFY_CREDENTIALS = config.SPOTIFY_CREDENTIALS[req.body.appName];
  const authString = btoa(unescape(encodeURIComponent(`${SPOTIFY_CREDENTIALS.CLIENT_ID}:${SPOTIFY_CREDENTIALS.CLIENT_SECRET}`)));
  
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: qs.stringify({
      grant_type: 'client_credentials',
    }),
    headers: {
      Authorization: `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((response) => {
    
    res.send(response.data);

  }).catch((error) => {

    console.log(error);

  });

});

app.listen(port, () => {

  console.log(`Listening on http://localhost:${port}`);

});
