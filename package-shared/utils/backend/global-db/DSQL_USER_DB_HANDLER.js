// @ts-check

const fs = require("fs");
const path = require("path");

const mysql = require("serverless-mysql");
const grabDbSSL = require("../grabDbSSL");

let DSQL_USER = mysql({
    config: {
        host: process.env.DSQL_DB_HOST,
        user: process.env.DSQL_DB_READ_ONLY_USERNAME,
        password: process.env.DSQL_DB_READ_ONLY_PASSWORD,
        charset: "utf8mb4",
        ssl: grabDbSSL(),
    },
});

/**
 * DSQL user read-only DB handler
 * @param {object} params
 * @param {"Full Access" | "FA" | "Read Only"} params.paradigm
 * @param {string} params.database
 * @param {string} params.queryString
 * @param {string[]} [params.queryValues]
 */
function DSQL_USER_DB_HANDLER({
    paradigm,
    database,
    queryString,
    queryValues,
}) {
    try {
        return new Promise((resolve, reject) => {
            const fullAccess = paradigm?.match(/full.access|^fa$/i)
                ? true
                : false;

            try {
                if (fullAccess) {
                    DSQL_USER = mysql({
                        config: {
                            host: process.env.DSQL_DB_HOST,
                            user: process.env.DSQL_DB_FULL_ACCESS_USERNAME,
                            password: process.env.DSQL_DB_FULL_ACCESS_PASSWORD,
                            database: database,
                            ssl: grabDbSSL(),
                        },
                    });
                } else {
                    DSQL_USER = mysql({
                        config: {
                            host: process.env.DSQL_DB_HOST,
                            user: process.env.DSQL_DB_READ_ONLY_USERNAME,
                            password: process.env.DSQL_DB_READ_ONLY_PASSWORD,
                            database: database,
                            ssl: grabDbSSL(),
                        },
                    });
                }

                /**
                 * ### Run query Function
                 * @param {any} results
                 */
                function runQuery(results) {
                    DSQL_USER.end();
                    resolve(JSON.parse(JSON.stringify(results)));
                }

                /**
                 * ### Query Error
                 * @param {any} err
                 */
                function queryError(err) {
                    DSQL_USER.end();
                    resolve({
                        error: err.message,
                        queryStringGenerated: queryString,
                        queryValuesGenerated: queryValues,
                        sql: err.sql,
                    });
                }

                if (
                    queryValues &&
                    Array.isArray(queryValues) &&
                    queryValues[0]
                ) {
                    DSQL_USER.query(queryString, queryValues)
                        .then(runQuery)
                        .catch(queryError);
                } else {
                    DSQL_USER.query(queryString)
                        .then(runQuery)
                        .catch(queryError);
                }

                ////////////////////////////////////////
            } catch (/** @type {any} */ error) {
                ////////////////////////////////////////

                fs.appendFileSync(
                    "./.tmp/dbErrorLogs.txt",
                    error.message + "\n" + Date() + "\n\n\n",
                    "utf8"
                );

                resolve({
                    error: error.message,
                });
            }
        });
    } catch (/** @type {any} */ error) {
        return {
            success: false,
            error: error.message,
        };
    }
}

module.exports = DSQL_USER_DB_HANDLER;
