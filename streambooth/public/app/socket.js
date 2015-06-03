'use strict';

(function() {

  module.exports = function(app) {
    app.on('client-connection', function() {
      console.log('New client connection');
    });
  }

})();
