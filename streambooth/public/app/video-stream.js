'use strict';

(function() {

  const path = require('path');
  const fs = require('fs');
  const ip = require('ip');

  module.exports = function(app) {

    const io = require('socket.io')(app.webserver);
    const ss = require('socket.io-stream');

    app.on('start-streaming', function() {
      console.log('Start streaming...');
    });

    app.on('stop-streaming', function() {
      console.log('Stop streaming...');
    });

    app.window.onload = function() {

      const toogleStreamBtn = app.window.document.getElementById('toogleStream');
      const address = app.window.document.getElementById('address');
      address.innerHTML= `Connect to http://${ip.address()}:3002`;

      let onStream = false;
      let nConnections = 0;

      toogleStreamBtn.addEventListener('click', function(e) {
        if(!onStream) {
          onStream = true;
          console.log('Emit start-start-stream')
          return app.emit('start-start-stream');
        }
        onStream = false;
        console.log('Emit stop-start-stream')
        app.emit('stop-start-stream');
      })

      const camera = app.window.document.getElementById('camera'); // video
      const canvas = app.window.document.getElementById('canvas'); //canvas
      const nConnectionsEl = app.window.document.getElementById('nConnections');
      const ctx = canvas.getContext('2d');

      let sockets = [];

      app.window.navigator.webkitGetUserMedia({video: true},
        function(stream) {

          let intervalHandle = null;

          app.on('start-start-stream', function() {
            intervalHandle = setInterval(function () {
              ctx.drawImage(camera, 0, 0, 640, 480);
              const url = canvas.toDataURL();

              sockets.forEach(function(socket) {
                ss(socket).emit('on-stream', url);
              });
            }, 33);
          });

          app.on('stop-start-stream', function() {
            clearInterval(intervalHandle);

            setTimeout(function() {
              sockets.forEach(function(socket) {
                ss(socket).emit('off-stream', true);
              });
            }, 75);

          });

          camera.src = app.window.URL.createObjectURL(stream);

          io.of('/video').on('connection', function(socket) {
            console.log('New connection!');
            nConnections++;
            nConnectionsEl.innerHTML = `${nConnections} people connected.`;
            sockets.push(socket);

            if(onStream) {
              const url = canvas.toDataURL();
              ss(socket).emit('on-stream', url);
            } else {
              ss(socket).emit('off-stream', true);
            }

            socket.on('disconnect', function () {
              nConnections--;
              nConnectionsEl.innerHTML = `${nConnections} people connected.`;
            });

          });

          setTimeout(function() {
            app.emit('show-main-window');
          }, 1500);
        },
        function() {
          alert('could not connect stream');
        }
      );




    };

  }

})();
