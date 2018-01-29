var gkm = require('gkm');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var pw = require('./password');

let keydowns = 0;
let clicks = 0;
gkm.events.on('key.pressed', function() {
  keydowns++;
});

gkm.events.on('mouse.pressed', function() {
  clicks++;
});

var isSent = false;
process.stdin.resume();
function exitHandler() {
  if (!isSent) {
    console.log('exiting...');
    isSent = true;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbz0ZAT-X7UctEiwTEsnTqRwqBOnjeX6SRA3Ob0tI-XBamx89Ms/exec', false)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('password=' + pw + '&keydowns=' + keydowns + '&clicks=' + clicks);
  }
  process.exit();
}

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);
