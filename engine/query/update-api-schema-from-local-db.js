// @ts-check

/**
 * Imports
 */
const https = require("https");
const http = require("http");
const path = require("path");
const fs = require("fs");
const grabHostNames = require("../../package-shared/utils/grab-host-names");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {Object} PostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - The Y Coordinate
 * @property {string} [error] - The Y Coordinate
 */

/**
 * # Update API Schema From Local DB
 *
 * @async
 *
 * @returns { Promise<PostReturn> } - Return Object
 */
async function updateApiSchemaFromLocalDb() {
    try {
        /**
         * Initialize
         */
        const dbSchemaPath = path.resolve(process.cwd(), "dsql.schema.json");
        const key = process.env.DSQL_KEY || "";

        const dbSchema = JSON.parse(fs.readFileSync(dbSchemaPath, "utf8"));
        const { host, port, scheme } = grabHostNames();

        /**
         * Make https request
         *
         * @description make a request to datasquirel.com
         */
        const httpResponse = await new Promise((resolve, reject) => {
            const reqPayloadString = JSON.stringify({
                schema: dbSchema,
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

            const httpsRequest = scheme.request(
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": Buffer.from(reqPayload).length,
                        Authorization: key,
                    },
                    port,
                    hostname: host,
                    path: `/api/query/update-schema-from-single-database`,
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
    } catch (/** @type {*} */ error) {
        return {
            success: false,
            payload: null,
            error: error.message,
        };
    }
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = updateApiSchemaFromLocalDb;
