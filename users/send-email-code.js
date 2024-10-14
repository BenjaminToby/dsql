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
const localSendEmailCode = require("../engine/user/send-email-code");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Send Email Code to a User
 * ==============================================================================
 * @async
 *
 * @param {object} params - Single Param object containing params
 * @param {String} params.key - FULL ACCESS API Key
 * @param {String} params.database - Target Database
 * @param {string} params.email Login Email/Username and Password
 * @param {http.ServerResponse} params.response - Http response object
 * @param {String} params.encryptionKey - Encryption Key
 * @param {String} params.encryptionSalt - Encryption Salt
 * @param {string} [params.temp_code_field] - Database table field name for temporary code
 * @param {string} [params.mail_domain]
 * @param {string} [params.mail_username]
 * @param {string} [params.mail_password]
 * @param {number} [params.mail_port]
 * @param {string} [params.sender]
 *
 * @returns { Promise<boolean>}
 */
async function sendEmailCode({
    key,
    email,
    database,
    encryptionKey,
    encryptionSalt,
    temp_code_field,
    mail_domain,
    mail_password,
    mail_username,
    mail_port,
    sender,
}) {
    const scheme = process.env.DSQL_HTTP_SCHEME;
    const localHost = process.env.DSQL_LOCAL_HOST;
    const localHostPort = process.env.DSQL_LOCAL_HOST_PORT;

    const defaultTempLoginFieldName = "temp_login_code";
    const emailLoginTempCodeFieldName = temp_code_field
        ? temp_code_field
        : defaultTempLoginFieldName;

    /**
     * Check Encryption Keys
     *
     * @description Check Encryption Keys
     */
    if (!encryptionKey?.match(/./)) {
        console.log("DSQL Error => No Encryption Key Found!");
        return false;
    }

    if (!encryptionSalt?.match(/./)) {
        console.log("DSQL Error => No Encryption Salt Found!");
        return false;
    }

    if (encryptionKey.length < 24) {
        console.log("DSQL Error => Encryption key less than 24 characters!");
        return false;
    }

    if (encryptionSalt.length < 8) {
        console.log("DSQL Error => Encryption Salt less than 8 characters!");
        return false;
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
        /** @type {import("@/package-shared/types/database-schema.td").DSQL_DatabaseSchemaType | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(
                process.cwd(),
                "dsql.schema.json"
            );
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        if (dbSchema) {
            httpResponse = await localSendEmailCode({
                email,
                dbSchema,
                email_login_field: emailLoginTempCodeFieldName,
                mail_domain,
                mail_password,
                mail_username,
                mail_port,
                sender,
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
                email,
                database,
                email_login_field: emailLoginTempCodeFieldName,
                mail_domain,
                mail_password,
                mail_username,
                mail_port,
                sender,
                html: fs.readFileSync(
                    path.resolve(
                        __dirname,
                        "../engine/user/one-time-code.html"
                    ),
                    "utf-8"
                ),
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
                    path: `/api/user/send-email-code`,
                },

                /**
                 * Callback Function
                 *
                 * @description https request callback
                 */
                (res) => {
                    var str = "";

                    res.on("data", function (chunk) {
                        str += chunk;
                    });

                    res.on("end", function () {
                        resolve(JSON.parse(str));
                    });

                    res.on("error", (err) => {
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
        return true;
    } else {
        console.log(httpResponse);
        return false;
    }
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = sendEmailCode;
