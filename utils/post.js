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
 * Make a post request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {string} [params.key] - FULL ACCESS API Key
 * @param {string} [params.database] - Database Name
 * @param {import("../package-shared/types").PostDataPayload | string} params.query - SQL query String or Request Object
 * @param {any[]} [params.queryValues] - Query Values if using "?" placeholders
 * @param {string} [params.tableName] - Name of the table to query
 *
 * @returns { Promise<import("../package-shared/types").PostReturn> } - Return Object
 */
async function post({ key, query, queryValues, database, tableName }) {
    const scheme = process.env.DSQL_HTTP_SCHEME;
    const localHost = process.env.DSQL_LOCAL_HOST;
    const localHostPort = process.env.DSQL_LOCAL_HOST_PORT;
    const remoteHost = process.env.DSQL_API_REMOTE_HOST?.match(/.*\..*/)
        ? process.env.DSQL_API_REMOTE_HOST
        : undefined;
    const remoteHostPort = process.env.DSQL_API_REMOTE_HOST_PORT?.match(/./)
        ? process.env.DSQL_API_REMOTE_HOST_PORT
        : undefined;

    /**
     * Check for local DB settings
     *
     * @description Look for local db settings in `.env` file and by pass the http request if available
     */
    const { DSQL_DB_HOST, DSQL_DB_USERNAME, DSQL_DB_PASSWORD, DSQL_DB_NAME } =
        process.env;

    if (
        DSQL_DB_HOST?.match(/./) &&
        DSQL_DB_USERNAME?.match(/./) &&
        DSQL_DB_PASSWORD?.match(/./) &&
        DSQL_DB_NAME?.match(/./)
    ) {
        /** @type {import("../package-shared/types").DSQL_DatabaseSchemaType | undefined} */
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
                port: remoteHostPort || localHostPort || 443,
                hostname: remoteHost || localHost || "datasquirel.com",
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
