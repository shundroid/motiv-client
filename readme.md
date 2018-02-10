<p align="center">
  <img src="./motiv-logo.png" /><br />
  A human motivation meter.<br />
  <br />
  <img src="./thumbnail.png" /><br />
</p>

# motiv-client-node

The client of motiv implemented by Node.js

## Install

```
$ git clone https://github.com/shundroid/motiv-client-node.git
$ npm install
```

### Settings

Set Server URL and Password.

preferences.js
```js
module.exports = { server: 'Your server url', password: 'Your password' }
```

### Run

```
$ node index
```

### Or make exe

Using [nexe](https://github.com/nexe/nexe)
```
$ cat index.js | nexe
```

### Register to startup (Windows)

Make a shortcut that runs `node <path>/build.js`.
Move it to `shell:startup`.

## Links

[.NET Version](https://github.com/shundroid/motiv-client-net)

## Author

[shundroid](https://shundroid.netlify.com/)
