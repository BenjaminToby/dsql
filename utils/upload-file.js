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
 * @typedef {Object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{
 *   urlPath: string,
 * }} payload - Payload containing the url for the image and its thumbnail
 */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single Param object containing params
 * @param {String} params.key - *FULL ACCESS API Key
 * @param {{
 *    fileData: string,
 *    fileName: string,
 *    mimeType?: string,
 *    folder?: string,
 *    isPrivate?: boolean,
 * }} params.payload - Image Data Eg.
 *
 * @returns { Promise<FunctionReturn> } - Return Object
 */
async function uploadImage({ key, payload }) {
    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        const reqPayload = JSON.stringify(payload);

        const httpsRequest = https.request(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.from(reqPayload).length,
                    Authorization: key,
                },
                port: 443,
                hostname: "datasquirel.com",
                path: `/api/query/add-file`,
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
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = uploadImage;