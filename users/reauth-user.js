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

const userAuth = require("./user-auth");
const localReauthUser = require("../engine/user/reauth-user");
const grabHostNames = require("../package-shared/utils/grab-host-names");

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
 * @param {string} [params.token] - access token to use instead of getting from cookie header
 *
 * @returns { Promise<import("../package-shared/types").ReauthUserFunctionReturn> }
 */
async function reauthUser({
    key,
    database,
    response,
    request,
    level,
    encryptionKey,
    encryptionSalt,
    additionalFields,
    token,
}) {
    /**
     * Check Encryption Keys
     *
     * @description Check Encryption Keys
     */
    const { host, port, scheme } = grabHostNames();

    const existingUser = userAuth({
        database,
        encryptionKey,
        encryptionSalt,
        level,
        request,
        token,
    });

    if (!existingUser?.payload?.id) {
        return {
            success: false,
            payload: null,
            msg: "Cookie Credentials Invalid",
        };
    }

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
        /** @type {import("../package-shared/types").DSQL_DatabaseSchemaType | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(
                process.cwd(),
                "dsql.schema.json"
            );
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        if (dbSchema) {
            httpResponse = await localReauthUser({
                existingUser: existingUser.payload,
                additionalFields,
                dbSchema,
            });
        }
    } else {
        /**
         * Make https request
         *
         * @description make a request to datasquirel.com
         */
        httpResponse = await new Promise((resolve, reject) => {
            const reqPayload = JSON.stringify({
                existingUser: existingUser.payload,
                database,
                additionalFields,
            });

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

        response.setHeader("Set-Cookie", [
            `${authKeyName}=${encryptedPayload};samesite=strict;path=/;HttpOnly=true;Secure=true`,
            `${csrfName}=${httpResponse.payload.csrf_k};samesite=strict;path=/;HttpOnly=true`,
            `dsqluid=${userId};samesite=strict;path=/;HttpOnly=true`,
        ]);

        if (token) {
            httpResponse.token = encryptedPayload;
        }
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
