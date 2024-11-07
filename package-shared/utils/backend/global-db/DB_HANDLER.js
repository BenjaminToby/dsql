// @ts-check

const mysql = require("serverless-mysql");
const grabDbSSL = require("../grabDbSSL");

const MASTER = mysql({
    config: {
        host: process.env.DSQL_DB_HOST,
        user: process.env.DSQL_DB_USERNAME,
        password: process.env.DSQL_DB_PASSWORD,
        database: process.env.DSQL_DB_NAME,
        port: process.env.DSQL_DB_PORT
            ? Number(process.env.DSQL_DB_PORT)
            : undefined,
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
