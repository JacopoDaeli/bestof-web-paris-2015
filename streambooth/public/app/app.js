'use strict';

const appDir = './public/app/';

(function() {

  const EventEmitter = require('event-emitter');

  const app = new EventEmitter();
  app.gui = require('nw.gui');
  app.window = window;

  require(`${appDir}/gui`)(app);
  require(`${appDir}/web-server`)(app);
  require(`${appDir}/video-stream`)(app);

})();
