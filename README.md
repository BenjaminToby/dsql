# Datasquirel

This package requires an account with datasquirel, so be sure to create an account at [datasquirel-create-account](https://datasquirel.com/create-account) before you continue.

## Instalation

### Package manager

Using npm:

```bash
$ npm install datasquirel
```

Once the package is installed, you can import the library using `require` approach:

```js
const datasquirel = require("datasquirel");
```

## Usage

### Fetch Data

This method requires a readonly key or fullaccess key gotten from [datasquirel](https://datasquirel.com/). It uses a basic https get request paired with some query params.

`code`
