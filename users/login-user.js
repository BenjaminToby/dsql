/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const https = require("https");
const encrypt = require("../functions/encrypt");

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
 * @param {String} database - Target Database
 * @param {Object} payload - SQL query String or Request Object. Eg. {
        action: "insert | update | delete",
        data: {
            user_id: user.id,
            user_first_name: user.first_name,
            user_last_name: user.last_name,
        },
        table: "posts",
    }
 * @param {Object} response - Http response object
 * @param {String} encryptionKey - Encryption Key
 * @param {String} encryptionSalt - Encryption Salt
 */
module.exports = async function ({ key, payload, database, response, encryptionKey, encryptionSalt }) {
    /**
     * Check Encryption Keys
     *
     * @description Check Encryption Keys
     */
    if (!encryptionKey?.match(/./))
        return {
            success: false,
            payload: null,
            msg: "Encryption Key Required",
        };

    if (!encryptionSalt?.match(/./))
        return {
            success: false,
            payload: null,
            msg: "Encryption Salt Required",
        };

    if (encryptionKey.length < 24)
        return {
            success: false,
            payload: null,
            msg: "Encryption Key must be at least 24 characters",
        };

    if (encryptionSalt.length < 8)
        return {
            success: false,
            payload: null,
            msg: "Encryption Salt must be at least 8 characters",
        };

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        const reqPayload = JSON.stringify({
            payload,
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
                path: `/api/user/login-user`,
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
    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    if (httpResponse?.success) {
        let encryptedPayload = encrypt({
            data: JSON.stringify(httpResponse.payload),
            encryptionKey,
            encryptionSalt,
        });

        response.setHeader("Set-Cookie", [`datasquirelAuthKey=${encryptedPayload};samesite=strict;path=/;HttpOnly=true;Secure=true`, `csrf=${httpResponse.csrf};samesite=strict;path=/;HttpOnly=true`]);
    }

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    return httpResponse;
};

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
