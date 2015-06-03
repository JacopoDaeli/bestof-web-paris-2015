'use strict';

(function() {

  const path = require('path');
  const express = require('express');
  const server = express();
  const fs = require('fs');

  module.exports = function(app) {

    server.use(express.static('./public/webapp'));

    server.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '../../webapp.html'));
    });

    const web = server.listen(3002, function () {
      console.log(`Server is listening on port 3002...`);
    });

    app.webserver = web;

  }

})();
