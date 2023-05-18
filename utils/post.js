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
 * @typedef {Object} PostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {(Object[]|string)} [payload=[]] - The Y Coordinate
 */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {string} params.key - API Key
 * @param {string} params.database - Database Name
 * @param {(Object | string)} params.query - SQL query String or Request Object
 * @param {string} [params.query.action="insert"] - Query action => insert | update | delete
 * @param {string} params.query.table - Database table slug
 * @param {string} params.query.identifierColumnName - Name of column(or field) to match
 * @param {(string | number)} params.query.identifierValue - Value attached to target column(or field)
 * @param {Object} params.query.data - data to be inserted: eg. { id: 1267, first_name: John, last_name: Doe }
 *
 * @returns { PostReturn } - Return Object
 */
module.exports = async function ({ key, query, database }) {
    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        const reqPayload = JSON.stringify({
            query,
            database,
        });

        const httpsRequest = https.request(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": reqPayload.length,
                    Authorization: key,
                },
                port: 443,
                hostname: "datasquirel.com",
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
                    resolve(JSON.parse(str));
                });

                response.on("error", (err) => {
                    reject(err);
                });
            }
        );

        httpsRequest.write(reqPayload);
        httpsRequest.end();
    });

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    return httpResponse;
};

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
