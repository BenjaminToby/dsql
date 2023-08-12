// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
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
 * @property {import("../types/database-schema.td").DSQL_DatabaseSchemaType[] | import("../types/database-schema.td").DSQL_DatabaseSchemaType | null} payload - Response payload
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
    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        https
            .request(
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: key,
                    },
                    port: 443,
                    hostname: "datasquirel.com",
                    path: "/api/query/get-schema" + (database ? `?database=${database}` : ""),
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
