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
 *   urlThumbnailPath: string
 * }} payload - Payload containing the url for the image and its thumbnail
 *  @property {string} [msg] - An optional message
 */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single Param object containing params
 * @param {String} params.key - *FULL ACCESS API Key
 * @param { string } params.url - File URL
 *
 * @returns { Promise<FunctionReturn> } - Image Url
 */
async function uploadImage({ key, url }) {
    try {
        /**
         * Make https request
         *
         * @description make a request to datasquirel.com
         */
        const httpResponse = await new Promise((resolve, reject) => {
            const reqPayload = JSON.stringify({ url: url });

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
                    path: `/api/query/delete-file`,
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
    } catch (error) {
        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */

        console.log("Error deleting file: ", error.message);

        return {
            success: false,
            payload: null,
            msg: error.message,
        };
    }
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = uploadImage;