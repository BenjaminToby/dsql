// @ts-check

const fs = require("fs");
const serverError = require("./serverError");

const mysql = require("serverless-mysql");
const path = require("path");

const SSL_DIR = "/app/ssl";

const connection = mysql({
    config: {
        host: process.env.DSQL_DB_HOST,
        user: process.env.DSQL_DB_USERNAME,
        password: process.env.DSQL_DB_PASSWORD,
        database: process.env.DSQL_DB_NAME,
        charset: "utf8mb4",
        ssl: {
            ca: fs.readFileSync(`${SSL_DIR}/ca-cert.pem`),
        },
    },
});

/**
 * Main DB Handler Function
 * ==============================================================================
 * @async
 *
 * @param {any} args
 * @returns {Promise<object|null>}
 */
module.exports = async function dbHandler(...args) {
    process.env.NODE_ENV?.match(/dev/) &&
        fs.appendFileSync(
            "./.tmp/sqlQuery.sql",
            args[0] + "\n" + Date() + "\n\n\n",
            "utf8"
        );

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let results;

    /**
     * Fetch from db
     *
     * @description Fetch data from db if no cache
     */
    try {
        results = await new Promise((resolve, reject) => {
            // @ts-ignore
            connection.query(...args, (error, result, fields) => {
                if (error) {
                    resolve({ error: error.message });
                } else {
                    resolve(result);
                }
            });
        });

        await connection.end();
    } catch (/** @type {any} */ error) {
        fs.appendFileSync(
            "./.tmp/dbErrorLogs.txt",
            JSON.stringify(error, null, 4) + "\n" + Date() + "\n\n\n",
            "utf8"
        );

        results = null;

        serverError({
            component: "dbHandler",
            message: error.message,
        });
    }

    /**
     * Return results
     *
     * @description Return results add to cache if "req" param is passed
     */
    if (results) {
        return JSON.parse(JSON.stringify(results));
    } else {
        return null;
    }
};
