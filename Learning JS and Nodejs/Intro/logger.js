console.log(__filename);
console.log(__dirname);

var url = 'https://myLogger.io/log';

const EventEmitter = require('events');

class MyLogger extends EventEmitter {

  log(message) {

    console.log(message);

    this.emit('logging', {
      data: 'Message'
    });

  }
}

module.exports = MyLogger;
// module.exports.endPoint = url;

//module.exports = log