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
 * @typedef {object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{
 *   id: number,
 *   first_name: string,
 *   last_name: string,
 *   username: string,
 *   email: string,
 *   phone: string,
 *   social_id: [string],
 *   image: string,
 *   image_thumbnail: string,
 *   verification_status: [number=0],
 *   social_login: [number],
 *   social_platform: [string],
 *   csrf_k: string,
 *   more_data: [string],
 *   logged_in_status: boolean,
 *   date: string,
 * }} payload - Payload
 */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {object} params - Single Param object containing params
 * @param {String} params.key - API Key
 * @param {String} params.database - Target Database
 * @param {{
 *  email: string,
 *  password: string
 * }} params.payload Login Email/Username and Password
 * @param {Object} params.response - Http response object
 * @param {String} params.encryptionKey - Encryption Key
 * @param {String} params.encryptionSalt - Encryption Salt
 *
 * @returns { Promise<FunctionReturn>}
 */
async function loginUser({ key, payload, database, response, encryptionKey, encryptionSalt }) {
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
     *
     * @type {{ success: boolean, payload: DATASQUIREL_LoggedInUser | null }}
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
                    "Content-Length": Buffer.from(reqPayload).length,
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

        const { userId } = httpResponse;

        const authKeyName = `datasquirel_${userId}_${database}_auth_key`;
        const csrfName = `datasquirel_${userId}_${database}_csrf`;

        response.setHeader("Set-Cookie", [`${authKeyName}=${encryptedPayload};samesite=strict;path=/;HttpOnly=true;Secure=true`, `${csrfName}=${httpResponse.payload.csrf_k};samesite=strict;path=/;HttpOnly=true`, `dsqluid=${userId};samesite=strict;path=/;HttpOnly=true`]);
    }

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    return httpResponse;
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = loginUser;
