// @ts-check

const mysql = require("serverless-mysql");
const grabDbSSL = require("../grabDbSSL");

let NO_DB = mysql({
    config: {
        host: process.env.DSQL_DB_HOST,
        user: process.env.DSQL_DB_USERNAME,
        password: process.env.DSQL_DB_PASSWORD,
        charset: "utf8mb4",
        ssl: grabDbSSL(),
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
