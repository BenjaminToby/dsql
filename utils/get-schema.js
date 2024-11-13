// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");
const https = require("https");
const grabHostNames = require("../package-shared/utils/grab-host-names");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {Object} GetSchemaReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../package-shared/types").DSQL_DatabaseSchemaType | import("../package-shared/types").DSQL_TableSchemaType | import("../package-shared/types").DSQL_FieldSchemaType | null} payload - Response payload
 */

/**
 * # Get Schema for Database, table, or field *
 * @param {import("../package-shared/types").GetSchemaAPIParam} params
 *
 * @returns { Promise<GetSchemaReturn> } - Return Object
 */
async function getSchema({ key, database, field, table }) {
    const { host, port, scheme } = grabHostNames();

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

        scheme
            .request(
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: key,
                    },
                    port,
                    hostname: host,
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
