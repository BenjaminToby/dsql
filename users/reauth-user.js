// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");
const https = require("https");
const encrypt = require("../functions/encrypt");

const userAuth = require("./user-auth");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../types/user.td").DATASQUIREL_LoggedInUser  | null} payload - Payload
 * @property {string} [msg] - Response Message
 * @property {number} [userId] - user ID
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
 * @param {http.ServerResponse} params.response - Http response object
 * @param {http.IncomingMessage} params.request - Http request object
 * @param {("deep" | "normal")} [params.level] - Authentication level
 * @param {String} params.encryptionKey - Encryption Key
 * @param {String} params.encryptionSalt - Encryption Salt
 *  @param {string[]} [params.additionalFields] - Additional Fields to be added to the user object
 *
 * @returns { Promise<FunctionReturn> }
 */
async function reauthUser({ key, database, response, request, level, encryptionKey, encryptionSalt, additionalFields }) {
    /**
     * Check Encryption Keys
     *
     * @description Check Encryption Keys
     */
    const existingUser = userAuth({
        database,
        encryptionKey,
        encryptionSalt,
        level,
        request,
    });

    if (!existingUser?.payload?.id) {
        return {
            success: false,
            payload: null,
            msg: "Cookie Credentials Invalid",
        };
    }

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        const reqPayload = JSON.stringify({
            existingUser: existingUser.payload,
            database,
            additionalFields,
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
                path: `/api/user/reauth-user`,
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

module.exports = reauthUser;
