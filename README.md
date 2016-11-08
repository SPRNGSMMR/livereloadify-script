# livereloadify-script
Browserify plugin, aims to inject a LiveReload script into your js bundle.

## Quick Example

```bash
$ browserify app.js -o app.bundle.js -p [ livereloadify-script ]
```

It should have injected this script line in your html:

```html
<script src="//localhost:35729/livereload.js?snipver=1"></script>
```

## Usage

[![NPM](https://nodei.co/npm/livereloadify-script.png)](https://www.npmjs.com/package/livereloadify-script)

Use as a browserify plugin:

```bash
$ browserify app.js -o app.bundle.js -p [ livereloadify-script --port 37687 ]
```

#### Options

- `host`: (default `localhost`) is the address of the LiveReload server.
- `port`: (default `35729`) on which the livereload server has been configured.

## Testing

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Licence

[MIT](LICENSE)
