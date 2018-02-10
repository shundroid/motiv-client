const gkm = require('gkm')
const request = require('request')
const preferences = require('./preferences')

const maxCounts = 1000
let keydowns = 0
let clicks = 0
gkm.events.on('key.pressed', function() {
  keydowns++
  if (keydowns >= maxCounts) {
    sendRequest()
  }
})

gkm.events.on('mouse.pressed', function() {
  clicks++
  if (clicks >= maxCounts) {
    sendRequest()
  }
})

var isSent = false
process.stdin.resume()
function exitHandler() {
  if (!isSent) {
    console.log('exiting...');
    isSent = true
    updateForm()
    sendRequest().then(() => {
      process.exit()
    }, err => {
      console.log(err)
      process.exit()
    })
  }
}

process.on('exit', exitHandler)
process.on('SIGINT', exitHandler)
process.on('SIGUSR1', exitHandler)
process.on('SIGUSR2', exitHandler)
process.on('uncaughtException', exitHandler)

const headers = { 'Content-Type': 'application/json' }
const options = {
  url: preferences.server,
  method: 'POST',
  headers,
  json: true,
  form: { password: preferences.password, keydowns, clicks }
}
function updateForm() {
  options.form.keydowns = keydowns
  options.form.clicks = clicks
}
function sendRequest() {
  return new Promise((resolve, reject) => {
    updateForm()
    clear()
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

function clear() {
  keydowns = 0
  clicks = 0
}
