const fs = require('fs');

module.exports = (app) => {

  fs.readdirSync(__dirname).forEach((file) => {
    
    if (file == 'index.js') {
      return;
    } else {
      const name = file.substr(0, file.lastIndexOf('.'));
      require('./' + name)(app);
    }
    
  });

};
