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
 * @typedef {Object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{
 *   urlPath: string,
 *   urlThumbnailPath: string
 * } | null} payload - Payload containing the url for the image and its thumbnail
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
    const { host, port, scheme } = grabHostNames();

    try {
        /**
         * Make https request
         *
         * @description make a request to datasquirel.com
         */
        const httpResponse = await new Promise((resolve, reject) => {
            const reqPayload = JSON.stringify({ url: url });

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
    } catch (/** @type {*} */ error) {
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
