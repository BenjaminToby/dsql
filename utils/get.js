// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const localGet = require("../engine/query/get");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {Object} GetReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - GET request results
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 */

/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {string} [params.key] - API Key
 * @param {string} [params.db] - Database Name
 * @param {string} params.query - SQL Query
 * @param {string[]} [params.queryValues] - An array of query values if using "?" placeholders
 * @param {string} [params.tableName] - Name of the table to query
 *
 * @returns { Promise<GetReturn> } - Return Object
 */
async function get({ key, db, query, queryValues, tableName }) {
    const scheme = process.env.DSQL_HTTP_SCHEME;
    const localHost = process.env.DSQL_LOCAL_HOST;
    const localHostPort = process.env.DSQL_LOCAL_HOST_PORT;

    /**
     * Check for local DB settings
     *
     * @description Look for local db settings in `.env` file and by pass the http request if available
     */
    const {
        DSQL_HOST,
        DSQL_USER,
        DSQL_PASS,
        DSQL_DB_NAME,
        DSQL_KEY,
        DSQL_REF_DB_NAME,
        DSQL_FULL_SYNC,
    } = process.env;

    if (
        DSQL_HOST?.match(/./) &&
        DSQL_USER?.match(/./) &&
        DSQL_PASS?.match(/./) &&
        DSQL_DB_NAME?.match(/./)
    ) {
        /** @type {import("../types/database-schema.td").DSQL_DatabaseSchemaType | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(
                process.cwd(),
                "dsql.schema.json"
            );
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        return await localGet({
            dbSchema: dbSchema,
            options: {
                query: query,
                queryValues: queryValues,
                tableName: tableName,
            },
        });
    }

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        let path = `/api/query/get?db=${db}&query=${query
            .replace(/\n|\r|\n\r/g, "")
            .replace(/ {2,}/g, " ")
            .replace(/ /g, "+")}`;

        if (queryValues) {
            path += `&queryValues=${JSON.stringify(queryValues)}${
                tableName ? `&tableName=${tableName}` : ""
            }`;
        }

        (scheme?.match(/^http$/i) ? http : https)
            .request(
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: key,
                    },
                    port: localHostPort || 443,
                    hostname: localHost || "datasquirel.com",
                    path: encodeURIComponent(path),
                },

                /**
                 * Callback Function
                 *
                 * @description https request callback
                 */
                (response) => {
                    var str = "";

                    response.on("data", function (chunk) {
                        str += chunk;
                    });

                    response.on("end", function () {
                        resolve(JSON.parse(str));
                    });

                    response.on("error", (err) => {
                        console.log("DSQL get Error,", err.message);
                        reject(err);
                    });
                }
            )
            .end();
    });

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    return httpResponse;
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = get;
