// @ts-check

const fs = require("fs");
const path = require("path");

// const mysql = require("mysql");

// const NO_DB = mysql.createConnection({
//     host: process.env.DSQL_DB_HOST,
//     user: process.env.DSQL_DB_USERNAME,
//     password: process.env.DSQL_DB_PASSWORD,
//     charset: "utf8mb4",
// });

const mysql = require("serverless-mysql");

const SSL_DIR =
    process.env.DSQL_SSL_DIR || path.resolve(__dirname, "../../../../ssl");

let NO_DB = mysql({
    config: {
        host: process.env.DSQL_DB_HOST,
        user: process.env.DSQL_DB_USERNAME,
        password: process.env.DSQL_DB_PASSWORD,
        charset: "utf8mb4",
        ssl: {
            ca: fs.readFileSync(`${SSL_DIR}/ca-cert.pem`),
        },
    },
});

/**
 * DSQL user read-only DB handler
 * @param {object} params
 * @param {string} params.paradigm
 * @param {string} params.database
 * @param {string} params.queryString
 * @param {string[]} [params.queryValues]
 */ // @ts-ignore
function NO_DB_HANDLER(...args) {
    try {
        return new Promise((resolve, reject) => {
            NO_DB.query(...args)
                .then((results) => {
                    NO_DB.end();
                    resolve(JSON.parse(JSON.stringify(results)));
                })
                .catch((err) => {
                    NO_DB.end();
                    resolve({
                        error: err.message,
                        sql: err.sql,
                    });
                });
        });
    } catch (/** @type {any} */ error) {
        return {
            success: false,
            error: error.message,
        };
    }
}

module.exports = NO_DB_HANDLER;
