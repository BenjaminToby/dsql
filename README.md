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

```js
const datasquirel = require("datasquirel");
const getData = await datasquirel.get({
    key: "aldhkf89asdflksdafh908asdfjkhasdf", // API Key
    db: "my_database", // Database name slug (Eg. Db Name => My Database, Db Slug => my_database)
    query: "SELECT * FROM blog_posts", // SQL Query
});
```

Datasquirel uses all conventional SQL query commands. However you can only use the `SELECT` command when using a readonly API key.
