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
const encrypt = require("../../functions/encrypt");
const localGoogleAuth = require("../../engine/user/social/google-auth");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {object | null} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../../types/user.td").DATASQUIREL_LoggedInUser | null} user - Returned User
 * @property {number} [dsqlUserId] - Dsql User Id
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
 * @param {http.ServerResponse} params.response - HTTPS response object
 * @param {string} params.encryptionKey - Encryption key
 * @param {string} params.encryptionSalt - Encryption salt
 * @param {object} [params.additionalFields] - Additional Fields to be added to the user object
 *
 * @returns { Promise<FunctionReturn> }
 */
async function googleAuth({
    key,
    token,
    database,
    clientId,
    response,
    encryptionKey,
    encryptionSalt,
    additionalFields,
}) {
    const scheme = process.env.DSQL_HTTP_SCHEME;
    const localHost = process.env.DSQL_LOCAL_HOST;
    const localHostPort = process.env.DSQL_LOCAL_HOST_PORT;

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
     * Initialize HTTP response variable
     */
    let httpResponse;

    /**
     * Check for local DB settings
     *
     * @description Look for local db settings in `.env` file and by pass the http request if available
     */
    const {
        DSQL_HOST,
        DSQL_USER,
        DSQL_PASS,
        DSQL_DB_NAME,
        DSQL_KEY,
        DSQL_REF_DB_NAME,
        DSQL_FULL_SYNC,
    } = process.env;

    if (
        DSQL_HOST?.match(/./) &&
        DSQL_USER?.match(/./) &&
        DSQL_PASS?.match(/./) &&
        DSQL_DB_NAME?.match(/./)
    ) {
        /** @type {import("@/package-shared/types").DSQL_DatabaseSchemaType | undefined | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(
                process.cwd(),
                "dsql.schema.json"
            );
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        if (dbSchema) {
            httpResponse = await localGoogleAuth({
                dbSchema: dbSchema,
                token,
                clientId,
                additionalFields,
                response: response,
            });
        }
    } else {
        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * Make https request
         *
         * @description make a request to datasquirel.com
         * @type {{ success: boolean, user: import("@/package-shared/types").DATASQUIREL_LoggedInUser | null, msg?: string, dsqlUserId?: number } | null } - Https response object
         */
        httpResponse = await new Promise((resolve, reject) => {
            const reqPayload = JSON.stringify({
                token,
                clientId,
                database,
                additionalFields,
            });

            const httpsRequest = (
                scheme?.match(/^http$/i) ? http : https
            ).request(
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": Buffer.from(reqPayload).length,
                        Authorization: key,
                    },
                    port: localHostPort || 443,
                    hostname: localHost || "datasquirel.com",
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
    }

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

        response.setHeader("Set-Cookie", [
            `${authKeyName}=${encryptedPayload};samesite=strict;path=/;HttpOnly=true;Secure=true`,
            `${csrfName}=${user.csrf_k};samesite=strict;path=/;HttpOnly=true`,
            `dsqluid=${dsqlUserId};samesite=strict;path=/;HttpOnly=true`,
            `datasquirel_social_id=${user.social_id};samesite=strict;path=/`,
        ]);
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return httpResponse;
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

module.exports = googleAuth;
