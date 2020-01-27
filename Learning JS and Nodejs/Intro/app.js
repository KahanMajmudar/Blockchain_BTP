const path = require('path');
const logger = require('./logger');

//logger.log('message');
//log('message')

var pathObj = path.parse(__filename);
console.log(pathObj);


const os = require('os');

var totalMem = os.totalmem();
var freeMem = os.freemem();

// console.log("Total Memory is: " + totalMem);

console.log(`Total Memory is: ${totalMem}`);
console.log(`Free Memory is: ${freeMem}`);


const fs = require('fs');

// const files = fs.readdirSync('./');
// console.log(files);                              Synchronous, Do not use

fs.readdir('./', function(err, files) {

  if (err) console.log(err);
  else console.log('Result', files);

});


const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', function() {

  console.log('Event Occured!');

});
emitter.emit('event');



const MyLogger = require('./logger');
const mylogger = new MyLogger();

mylogger.on('logging', (args) => {

  console.log('Logging in...', args);

});
mylogger.log('message');









const http = require('http');

const server = http.createServer((req, res) => {

  if (req.url === '/') {

    res.write('Hello World');
    res.end();

  }

  if (req.url === '/api/courses') {

    res.write(JSON.stringify([1, 2, 3]));
    res.end();

  }

});

server.listen(3000);

console.log('Listening on port 3000');