'use strict';

(function() {

  module.exports = function(app){
    app.on('show-main-window', function() {
      app.gui.Window.get().show();
      app.gui.Window.get().focus();
    });
  }

})();
