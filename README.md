# resolve-link [![Build status](https://travis-ci.org/underdogio/resolve-link.png?branch=master)](https://travis-ci.org/underdogio/resolve-link)

Resolve complete/partial URLs against a canonical target URL

This library was built to resolve URLs when candidates submit incompleted URLs (e.g. missing protocol, username only).

```js
// Username only
resolveLink('underdogio', 'https://github.com/');
  // https://github.com/underdogio

// Missing protocol
resolveLink('www.linkedin.com/in/toddwolfson', 'https://www.linkedin.com/');
  // https://www.linkedin.com/in/toddwolfson

// Custom website
resolveLink('https://underdog.io/', 'https://www.linkedin.com/');
  // https://underdog.io/

// Complete URL
resolveLink('https://github.com/underdogio', 'https://github.com/');
  // https://github.com/underdogio
```

`resolve-link` is browser compatible and is 6kb when minified and gzipped.

## Getting Started
### npm
Install the module with: `npm install resolve-link`

```js
var resolveLink = require('resolve-link');
resolveLink('underdogio', 'https://github.com/'); // https://github.com/underdogio
```

### bower
Install the module with: `bower install resolve-link`

```html
<script src="bower_components/resolve-link/dist/resolve-link.min.js"></script>
<script>
  window.resolveLink; // Use same as in `npm`
</script>
```

### Vanilla
Download the minified JS at:

https://raw.githubusercontent.com/underdogio/resolve-link/master/dist/resolve-link.min.js

```html
<script src="resolve-link.min.js"></script>
<script>
  window.resolveLink; // Use same as in `npm`
</script>
```

## Documentation
We expose `resolveLink` as our `module.exports` and on `window.resolveLink` in `bower`/vanilla.

### `resolveLink(srcUrl, targetUrl)`
Resolve the best variation of `srcUrl` with respect to our `targetUrl`

- srcUrl `String` - URL/partial URL to be resolving from
- targetUrl `String` - Canonical URL to try to match if on the same domain

**Returns:**

- retVal `String` - Completed URL formatted via `node's url.format`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint` and test via `npm test`.

## License
Copyright (c) 2015 Underdog.io

Licensed under the MIT license.
