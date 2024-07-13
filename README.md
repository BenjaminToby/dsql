# Datasquirel

This package requires an account with datasquirel, so be sure to create an account at [datasquirel-create-account](https://datasquirel.com/create-account) before you continue.

## Installation

```bash
$ npm install --save https://github.com/BenjaminToby/dsql.git
```

Once the package is installed, you can import the library using `require` approach:

```js
const datasquirel = require("datasquirel");
```

## Usage

### Fetch Data

This method requires a readonly key or fullaccess API key gotten from [datasquirel](https://datasquirel.com/). It uses a basic https get request paired with some query params.

```js
const datasquirel = require("datasquirel");

const getData = await datasquirel.get({
    key: "aldhkf89asdflksdafh908asdfjkhasdf", // Readonly API Key
    db: "my_database", // Database name slug (Eg. Db Name => My Database, Db Slug => my_database)
    query: "SELECT * FROM blog_posts", // SQL Query
});
```

Datasquirel uses all conventional SQL query commands. However you can only use the `SELECT` command when using a readonly API key.

### Post Data

This method requires a fullaccess API key gotten from [datasquirel](https://datasquirel.com/). You can perform a basic fetch with this method, as well as more complex operations like `UPDATE`, `DELETE` and `INSERT`.

```js
const datasquirel = require("datasquirel");

const postData = await datasquirel.post({
    key: "aldhkf89asdflksdafh908asdfjkhasdf", // Fullaccess API Key
    payload: {
        action: "insert", // OR "update" OR "delete" OR "select"
        data: {
            user_id: "19aisdn123",
            user_first_name: "John",
            user_last_name: "Doe",
        },
        table: "users",
    },
});
```

You can simply replace the `payload` object with an SQL string and it does everything you provide in the SQL command.

```js
const datasquirel = require("datasquirel");

const postData = await datasquirel.post({
    key: process.env.FULL_ACCESS_API_KEY,
    payload: "SELECT * FROM blog_posts WHERE user_id='as09d7nasd90'",
});
```

You can add a condition to the `payload` object to filter the results

```js
const datasquirel = require("datasquirel");

const postData = await datasquirel.post({
    key: process.env.FULL_ACCESS_API_KEY,
    payload: {
        action: "delete",
        condition: `WHERE user_id='21adwei9jewr' AND type='buyers'`,
        table: "users",
    },
});
```

You can use `identifierColumnName` and `identifierValue` when updating an entry.

```js
const datasquirel = require("datasquirel");

const postData = await datasquirel.post({
    key: process.env.FULL_ACCESS_API_KEY,
    payload: {
        action: "update",
        table: "users",
        identifierColumnName: "id",
        identifierValue: "21adwei9jewr",
        data: {
            first_name: "Mary",
            last_name: "Spencer",
        },
    },
});
```

### Upload Image

This method requires is similar to the `post` method, but with different parameters.

```js
const datasquirel = require("datasquirel");

const postData = await datasquirel.uploadImage({
    key: process.env.FULL_ACCESS_API_KEY,
    payload: {
        imageData: "6ejsiua2i29ndsajkfn9n==", // Image in base64
        imageName: `awesome-waterfalls`,
        mimeType: "jpg", // optional
        thumbnailSize: 120, // optional === This measurement is in pixels(px)
    },
});
```
