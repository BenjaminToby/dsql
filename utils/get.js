// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("node:http");
const https = require("node:https");
const path = require("path");
const fs = require("fs");
const localGet = require("../engine/query/get");
const serializeQuery = require("./functions/serialize-query");
const grabHostNames = require("../package-shared/utils/grab-host-names");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

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
 * @returns { Promise<import("../package-shared/types").GetReturn> } - Return Object
 */
async function get({ key, db, query, queryValues, tableName }) {
    const { host, port, scheme } = grabHostNames();

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
        /** @type {import("../package-shared/types").GetReqQueryObject} */
        const queryObject = {
            db: String(db),
            query: String(
                query
                    .replace(/\n|\r|\n\r/g, "")
                    .replace(/ {2,}/g, " ")
                    .replace(/ /g, "+")
            ),
            queryValues: queryValues ? JSON.stringify(queryValues) : undefined,
            tableName,
        };

        const queryString = serializeQuery({ query: queryObject });

        let path = `/api/query/get${queryString}`;

        /** @type {https.RequestOptions} */
        const requestObject = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: key,
            },
            port,
            hostname: host,
            path: encodeURI(path),
        };

        scheme
            .request(
                requestObject,

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
                        } catch (/** @type {any} */ error) {
                            reject({
                                error: error.message,
                                result: str,
                            });
                        }
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
