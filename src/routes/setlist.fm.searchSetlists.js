const config = require('../config');
const axios = require('axios');

module.exports = (app) => {

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

};
