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
 * @param {({
 *  action: [string="insert"],
 *  table: string,
 *  identifierColumnName: string,
 *  identifierValue: (string|number),
 *  data: object,
 * } | string)} params.query - SQL query String or Request Object
 *
 * @returns { Promise<PostReturn> } - Return Object
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

        console.log(reqPayload);

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
                    try {
                        resolve(JSON.parse(str));
                    } catch (error) {
                        console.log(error.message);
                        console.log("Fetched Payload =>", str);

                        resolve({
                            success: false,
                            payload: null,
                            error: error.message,
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
