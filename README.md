# Datasquirel

This package requires an account with [datasquirel](https://datasquirel.com/create-account), or a self hosted instance of the datasquirel web admin with your URL. You can also use the SQL query aspect if you provide needed credentials for a database connection, however in this instance the static files feature is disabled.

## Installation

First add the npm registry to your .npmrc file:

```bash
@moduletrace:registry=https://git.tben.me/api/packages/moduletrace/npm/
```

After setting up the registry you can install the package by running

```bash
npm install @moduletrace/datasquirel
```

Once the package is installed, you can import the library using `require` approach:

```js
const datasquirel = require("@moduletrace/datasquirel");
```

Or you can use ES6 module imports:

```js
import datasquirel from "@moduletrace/datasquirel";
```

## Usage

### Fetch Data

This method requires a readonly key or fullaccess API key gotten from [datasquirel](https://datasquirel.com/). It uses a basic https get request paired with some query params.

```js
const datasquirel = require("@moduletrace/datasquirel");

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
const datasquirel = require("@moduletrace/datasquirel");

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
const datasquirel = require("@moduletrace/datasquirel");

const postData = await datasquirel.post({
    key: process.env.FULL_ACCESS_API_KEY,
    payload: "SELECT * FROM blog_posts WHERE user_id='as09d7nasd90'",
});
```

You can add a condition to the `payload` object to filter the results

```js
const datasquirel = require("@moduletrace/datasquirel");

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
const datasquirel = require("@moduletrace/datasquirel");

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
const datasquirel = require("@moduletrace/datasquirel");

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

### Local Querying

You can query directly from an SQL database if you provide these environment variables in your `.env` file:

```conf
DSQL_DB_HOST=
DSQL_DB_PORT=
DSQL_DB_USERNAME=
DSQL_DB_PASSWORD=
DSQL_DB_NAME=
DSQL_SSL_DIR=
```

The ssl directory **_must_** contain a file named `ca-cert.pem`. `DSQL_DB_PORT` defaults to **3306** if not provided.

### Remote Querying

You can query from a self hosted installation of datasquirel. Just add these environment variables:

```conf
DSQL_API_REMOTE_HOST=
DSQL_API_REMOTE_HOST_PORT=
```

If these aren't provided it defaults to `datasquirel.com`.
