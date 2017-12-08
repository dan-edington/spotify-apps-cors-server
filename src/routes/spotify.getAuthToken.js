const config = require('../config');
const axios = require('axios');
const qs = require('qs');
const btoa = require('btoa');

module.exports = (app) => {

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

};
