// @ts-check

const fs = require("fs");
const path = require("path");

const mysql = require("serverless-mysql");
const SSL_DIR = "/app/ssl";

const MASTER = mysql({
    config: {
        host: process.env.DSQL_DB_HOST,
        user: process.env.DSQL_DB_USERNAME,
        password: process.env.DSQL_DB_PASSWORD,
        database: process.env.DSQL_DB_NAME,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
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
async function DB_HANDLER(...args) {
    try {
        const results = await MASTER.query(...args);

        /** ********************* Clean up */
        await MASTER.end();

        return JSON.parse(JSON.stringify(results));
    } catch (/** @type {any} */ error) {
        console.log("DB Error =>", error);
        return {
            success: false,
            error: error.message,
        };
    }
}

module.exports = DB_HANDLER;
