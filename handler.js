'use strict';

const logger = require('winston').loggers.get('root');

const register = (socket) => {
  logger.debug('register socket event');
  socket.on('/compute', (data, cb) => {
    if (typeof cb != 'function')
      return;

    var json_data = JSON.stringify(data);
    var python = require('child_process').spawn(
        'python3',
        // second argument is array of parameters, e.g.:
        ["./scripts/compute.py"], {
          stdio: 'pipe'
        });
    python.stdin.write(json_data);
    python.stdin.end();
    var output = "";
    var err = "";
    python.stdout.on('data', function(data){ output += data });
    python.stderr.on('data', function(data){ err += data });
    python.on('close', function(code){
      console.log(output);
      console.log(err);
      if (code !== 0) {
        cb(null, output);
      } else {
        cb(output);
      }
    });
  });
};

const handle = (io) => {
  io.on('connection', register);
};

exports.handle = handle;
