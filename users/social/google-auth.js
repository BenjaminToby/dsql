/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const https = require("https");
const encrypt = require("../../functions/encrypt");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{id: number, first_name: string, last_name: string}|null} user - Returned User
 * @property {string} [msg] - Response message
 */

/**
 * SERVER FUNCTION: Login with google Function
 * ==============================================================================
 *
 * @async
 *
 * @param {object} params - main params object
 * @param {string} params.key - API full access key
 * @param {string} params.token - Google access token gotten from the client side
 * @param {string} params.database - Target database name(slug)
 * @param {string} params.clientId - Google client id
 * @param {object} params.response - HTTPS response object
 * @param {string} params.encryptionKey - Encryption key
 * @param {string} params.encryptionSalt - Encryption salt
 *
 * @returns { Promise<FunctionReturn> }
 */
module.exports = async function ({ key, token, database, clientId, response, encryptionKey, encryptionSalt }) {
    /**
     * Check inputs
     *
     * @description Check inputs
     */
    if (!key || key?.match(/ /)) {
        return {
            success: false,
            user: null,
            msg: "Please enter API full access Key",
        };
    }

    if (!token || token?.match(/ /)) {
        return {
            success: false,
            user: null,
            msg: "Please enter Google Access Token",
        };
    }

    if (!database || database?.match(/ /)) {
        return {
            success: false,
            user: null,
            msg: "Please provide database slug name you want to access",
        };
    }

    if (!clientId || clientId?.match(/ /)) {
        return {
            success: false,
            user: null,
            msg: "Please enter Google OAUTH client ID",
        };
    }

    if (!response || !response?.setHeader) {
        return {
            success: false,
            user: null,
            msg: "Please provide a valid HTTPS response object",
        };
    }

    if (!encryptionKey || encryptionKey?.match(/ /)) {
        return {
            success: false,
            user: null,
            msg: "Please provide a valid encryption key",
        };
    }

    if (!encryptionSalt || encryptionSalt?.match(/ /)) {
        return {
            success: false,
            user: null,
            msg: "Please provide a valid encryption salt",
        };
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     * @type {{ success: boolean, user: {id: number} | null, msg: string|null } | null} - Https response object
     */
    const httpResponse = await new Promise((resolve, reject) => {
        const reqPayload = JSON.stringify({
            token,
            clientId,
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
                path: `/api/user/google-login`,
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

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    if (httpResponse?.success && httpResponse?.user) {
        let encryptedPayload = encrypt({
            data: JSON.stringify(httpResponse.user),
            encryptionKey,
            encryptionSalt,
        });

        const { user, dsqlUserId } = httpResponse;

        const authKeyName = `datasquirel_${dsqlUserId}_${database}_auth_key`;
        const csrfName = `datasquirel_${dsqlUserId}_${database}_csrf`;

        response.setHeader("Set-Cookie", [`${authKeyName}=${encryptedPayload};samesite=strict;path=/;HttpOnly=true;Secure=true`, `${csrfName}=${user.csrf_k};samesite=strict;path=/;HttpOnly=true`, `dsqluid=${dsqlUserId};samesite=strict;path=/;HttpOnly=true`, `datasquirel_social_id=${user.social_id};samesite=strict;path=/`]);
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return httpResponse;
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
