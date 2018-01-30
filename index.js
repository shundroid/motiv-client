var gkm = require('gkm');
const request = require('request')
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
    updateForm()
    sendRequest().then(() => {
      process.exit()
    }, err => {
      console.log(err)
      process.exit()
    })
  }
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

const headers = { 'Content-Type': 'application/json' }
const options = {
  url: 'https://script.google.com/macros/s/AKfycbz0ZAT-X7UctEiwTEsnTqRwqBOnjeX6SRA3Ob0tI-XBamx89Ms/exec',
  method: 'POST',
  headers,
  json: true,
  form: { password: pw, keydowns, clicks }
}
function updateForm() {
  options.form.keydowns = keydowns
  options.form.clicks = clicks
}
function sendRequest() {
  return new Promise((resolve, reject) => {
    console.log('sending...')
    request(options, function(error, response, body) {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
