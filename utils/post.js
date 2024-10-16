// @ts-check

/**
 * Imports
 */
const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const localPost = require("../engine/query/post");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {Object} PostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {(Object[]|string)} [payload=[]] - The Y Coordinate
 */

/**
 * @typedef {object} PostDataPayload
 * @property {"insert" | "update" | "delete"} action - The target action to take
 * @property {string} table - Table name(slug) eg "blog_posts"
 * @property {object} [data] - Table insert payload object => This must have keys that match
 * table fields
 * @property {string?} [identifierColumnName] - Table identifier field name => eg. "id" OR "email"
 * @property {string?} [identifierValue] - Corresponding value of the selected field name => This
 * checks identifies a the target row for "update" or "delete". Not needed for "insert"
 * @property {string?} [duplicateColumnName] - Duplicate column name to check for
 * @property {string?} [duplicateColumnValue] - Duplicate column value to match. If no "update" param
 * provided, function will return null
 * @property {boolean?} [update] - Should the "insert" action update the existing entry if indeed
 * the entry with "duplicateColumnValue" exists?
 */

/**
 * Make a post request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {string} [params.key] - FULL ACCESS API Key
 * @param {string} [params.database] - Database Name
 * @param {PostDataPayload | string} params.query - SQL query String or Request Object
 * @param {any[]} [params.queryValues] - Query Values if using "?" placeholders
 * @param {string} [params.tableName] - Name of the table to query
 *
 * @returns { Promise<PostReturn> } - Return Object
 */
async function post({ key, query, queryValues, database, tableName }) {
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
        /** @type {import("@/package-shared/types").DSQL_DatabaseSchemaType | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(
                process.cwd(),
                "dsql.schema.json"
            );
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        return await localPost({
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
        const reqPayloadString = JSON.stringify({
            query,
            queryValues,
            database,
            tableName: tableName ? tableName : null,
        }).replace(/\n|\r|\n\r/gm, "");

        try {
            JSON.parse(reqPayloadString);
        } catch (error) {
            console.log(error);
            console.log(reqPayloadString);

            return {
                success: false,
                payload: null,
                error: "Query object is invalid. Please Check query data values",
            };
        }

        const reqPayload = reqPayloadString;

        const httpsRequest = (scheme?.match(/^http$/i) ? http : https).request(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.from(reqPayload).length,
                    Authorization: key,
                },
                port: localHostPort || 443,
                hostname: localHost || "datasquirel.com",
                path: `/api/query/post`,
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
                    try {
                        resolve(JSON.parse(str));
                    } catch (error) {
                        console.log(error);
                        console.log("Fetched Payload =>", str);

                        resolve({
                            success: false,
                            payload: null,
                            error: error,
                        });
                    }
                });

                response.on("error", (err) => {
                    resolve({
                        success: false,
                        payload: null,
                        error: err.message,
                    });
                });
            }
        );

        httpsRequest.write(reqPayload);

        httpsRequest.on("error", (error) => {
            console.log("HTTPS request ERROR =>", error);
        });

        httpsRequest.end();
    });

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    return httpResponse;
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = post;
