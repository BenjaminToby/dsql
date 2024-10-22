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
 * # Get Schema for Database, table, or field *
 * @param {import("../package-shared/types").GetSchemaAPIParam} params
 *
 * @returns { Promise<GetSchemaReturn> } - Return Object
 */
async function getSchema({ key, database, field, table }) {
    const scheme = process.env.DSQL_HTTP_SCHEME;
    const localHost = process.env.DSQL_LOCAL_HOST;
    const localHostPort = process.env.DSQL_LOCAL_HOST_PORT;

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        /** @type {import("../package-shared/types").GetSchemaRequestQuery} */
        const queryObject = { database, field, table };
        let query = Object.keys(queryObject)
            // @ts-ignore
            .filter((k) => queryObject[k])
            // @ts-ignore
            .map((k) => `${k}=${queryObject[k]}`)
            .join("&");

        console.log(queryObject);
        console.log(query);

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
                        (query?.match(/./) ? `?${query}` : ""),
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
