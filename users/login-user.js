// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const encrypt = require("../functions/encrypt");
const loginLocalUser = require("../engine/user/login-user");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {object} AuthenticatedUser
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../types/user.td").DATASQUIREL_LoggedInUser  | null} payload - Payload of the response
 * @property {string} [msg] - An optional message
 * @property {number} [userId] - An optional message
 */

/**
 * Login A user
 * ==============================================================================
 * @async
 *
 * @param {object} params - Single Param object containing params
 * @param {String} params.key - FULL ACCESS API Key
 * @param {String} params.database - Target Database
 * @param {{
 *  email?: string,
 *  username?: string,
 *  password: string,
 * }} params.payload Login Email/Username and Password
 * @param {string[]} [params.additionalFields] - Additional Fields to be added to the user object
 * @param {http.ServerResponse} params.response - Http response object
 * @param {String} params.encryptionKey - Encryption Key
 * @param {String} params.encryptionSalt - Encryption Salt
 *
 * @returns { Promise<AuthenticatedUser>}
 */
async function loginUser({ key, payload, database, additionalFields, response, encryptionKey, encryptionSalt }) {
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
     * Initialize HTTP response variable
     */
    let httpResponse;

    /**
     * Check for local DB settings
     *
     * @description Look for local db settings in `.env` file and by pass the http request if available
     */
    const { DSQL_HOST, DSQL_USER, DSQL_PASS, DSQL_DB_NAME, DSQL_KEY, DSQL_REF_DB_NAME, DSQL_FULL_SYNC } = process.env;

    if (DSQL_HOST?.match(/./) && DSQL_USER?.match(/./) && DSQL_PASS?.match(/./) && DSQL_DB_NAME?.match(/./)) {
        /** @type {import("../types/database-schema.td").DSQL_DatabaseSchemaType | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(process.cwd(), "dsql.schema.json");
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        console.log("Reading from local database ...");

        if (dbSchema) {
            httpResponse = await loginLocalUser({
                payload,
                additionalFields,
                dbSchema,
            });
        }
    } else {
        /**
         * Make https request
         *
         * @description make a request to datasquirel.com
         *
         * @type {{ success: boolean, payload: import("../types/user.td").DATASQUIREL_LoggedInUser | null, userId?: number, msg?: string }}
         */
        httpResponse = await new Promise((resolve, reject) => {
            const reqPayload = JSON.stringify({
                payload,
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
    }

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

        response.setHeader("Set-Cookie", [`${authKeyName}=${encryptedPayload};samesite=strict;path=/;HttpOnly=true;Secure=true`, `${csrfName}=${httpResponse.payload?.csrf_k};samesite=strict;path=/;HttpOnly=true`, `dsqluid=${userId};samesite=strict;path=/;HttpOnly=true`]);
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
