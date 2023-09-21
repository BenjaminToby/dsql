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
const localGithubAuth = require("../../engine/user/social/github-auth");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{id: number, first_name: string, last_name: string, csrf_k: string, social_id: string} | null} user - Returned User
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
 * @param {string} params.code - Github access code gotten from the client side
 * @param {string?} params.email - Email gotten from the client side if available
 * @param {string} params.database - Target database name(slug)
 * @param {string} params.clientId - Github client id
 * @param {string} params.clientSecret - Github client Secret
 * @param {http.ServerResponse} params.response - HTTPS response object
 * @param {string} params.encryptionKey - Encryption key
 * @param {string} params.encryptionSalt - Encryption salt
 * @param {object} [params.additionalFields] - Additional Fields to be added to the user object
 *
 * @returns { Promise<FunctionReturn | undefined> }
 */
async function githubAuth({ key, code, email, database, clientId, clientSecret, response, encryptionKey, encryptionSalt, additionalFields }) {
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

    if (!code || code?.match(/ /)) {
        return {
            success: false,
            user: null,
            msg: "Please enter Github Access Token",
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
            msg: "Please enter Github OAUTH client ID",
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
    const { DSQL_HOST, DSQL_USER, DSQL_PASS, DSQL_DB_NAME, DSQL_KEY, DSQL_REF_DB_NAME, DSQL_FULL_SYNC } = process.env;

    if (DSQL_HOST?.match(/./) && DSQL_USER?.match(/./) && DSQL_PASS?.match(/./) && DSQL_DB_NAME?.match(/./)) {
        /** @type {import("../../types/database-schema.td").DSQL_DatabaseSchemaType | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(process.cwd(), "dsql.schema.json");
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        console.log("Reading from local database ...");

        if (dbSchema) {
            httpResponse = await localGithubAuth({
                dbSchema: dbSchema,
                code,
                email: email || undefined,
                clientId,
                clientSecret,
                additionalFields,
                res: response,
            });
        }
    } else {
        /**
         * Make https request
         *
         * @description make a request to datasquirel.com
         * @type {FunctionReturn} - Https response object
         */
        httpResponse = await new Promise((resolve, reject) => {
            const reqPayload = JSON.stringify({
                code,
                email,
                clientId,
                clientSecret,
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
                    path: `/api/user/github-login`,
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
                        try {
                            resolve(JSON.parse(str));
                        } catch (error) {
                            console.log(error);

                            resolve({
                                success: false,
                                user: null,
                                msg: "Something went wrong",
                            });
                        }
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

        response.setHeader("Set-Cookie", [`${authKeyName}=${encryptedPayload};samesite=strict;path=/;HttpOnly=true;Secure=true`, `${csrfName}=${user.csrf_k};samesite=strict;path=/;HttpOnly=true`, `dsqluid=${dsqlUserId};samesite=strict;path=/;HttpOnly=true`, `datasquirel_social_id=${user.social_id};samesite=strict;path=/`]);
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return httpResponse;
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

module.exports = githubAuth;
