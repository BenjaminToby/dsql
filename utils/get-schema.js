// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");
const https = require("https");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {Object} GetSchemaReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../package-shared/types").DSQL_DatabaseSchemaType | null} payload - Response payload
 */

/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {string} params.key - `FULL ACCESS` API Key
 * @param {string} [params.database] - The database schema to get
 *
 * @returns { Promise<GetSchemaReturn> } - Return Object
 */
async function getSchema({ key, database }) {
    const scheme = process.env.DSQL_HTTP_SCHEME;
    const localHost = process.env.DSQL_LOCAL_HOST;
    const localHostPort = process.env.DSQL_LOCAL_HOST_PORT;

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
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
                    path:
                        "/api/query/get-schema" +
                        (database ? `?database=${database}` : ""),
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

module.exports = getSchema;
