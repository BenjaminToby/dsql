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
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @param {String} key - API Key
 * @param {Object} payload - Image Data Eg. {
        imageData: imageBase64,
        imageName: `cast_cord_user_${newUser.payload.insertId}`,
        mimeType: "jpg",
        thumbnailSize: 120,
    }
 */
module.exports = async function ({ key, payload }) {
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
                    "Content-Length": reqPayload.length,
                    Authorization: key,
                },
                port: 443,
                hostname: "datasquirel.com",
                path: `/api/query/add-image`,
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
