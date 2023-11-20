# killport
Kill process running on given port

## Install
```sh
npm install killport -D 
```

## Usage
```js
const killport = require('killport')
killport(port).then(resp => {
  console.log(resp)
});
```

## CLI
```sh
$ killport 8080
```

## License
MIT