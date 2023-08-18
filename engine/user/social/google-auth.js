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
const encrypt = require("../../../functions/encrypt");
const decrypt = require("../../../functions/decrypt");
const handleSocialDb = require("./utils/handleSocialDb");
const httpsRequest = require("./utils/httpsRequest");

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

const database = process.env.DSQL_DB_NAME || "";
const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
const encryptionSalt = process.env.DSQL_ENCRYPTION_SALT || "";

/**
 * SERVER FUNCTION: Login with google Function
 * ==============================================================================
 *
 * @async
 *
 * @param {object} params - main params object
 * @param {string} params.token - Google access token gotten from the client side
 * @param {string} params.clientId - Google client id
 * @param {http.ServerResponse} params.response - HTTPS response object
 * @param {object} [params.additionalFields] - Additional Fields to be added to the user object
 * @param {import("../../../types/database-schema.td").DSQL_DatabaseSchemaType} [params.dbSchema] - Database Schema
 *
 * @returns { Promise<FunctionReturn> }
 */
async function localGoogleAuth({ dbSchema, token, clientId, response, additionalFields }) {
    /**
     * Send Response
     *
     * @description Send a boolean response
     */
    try {
        /**
         * Grab User data
         *
         * @description Grab User data
         * @type {{ success: boolean, payload: any, msg: string }}
         */
        const payloadResponse = await httpsRequest({
            method: "POST",
            hostname: "datasquirel.com",
            path: "/user/grab-google-user-from-token",
            body: {
                token: token,
                clientId: clientId,
            },
            headers: {
                Authorization: process.env.DSQL_API_KEY,
            },
        });

        const payload = payloadResponse.payload;

        if (!payloadResponse.success || !payload) {
            console.log("payloadResponse Failed =>", payloadResponse);
            return {
                success: false,
                msg: "User fetch Error",
            };
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        if (!database || typeof database != "string" || database?.match(/ /)) {
            return {
                success: false,
                user: undefined,
                msg: "Please provide a database slug(database name in lowercase with no spaces)",
            };
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * Create new user folder and file
         *
         * @description Create new user folder and file
         */
        const targetDbName = database;

        if (!payload) {
            return {
                success: false,
                msg: "No payload",
            };
        }

        const { given_name, family_name, email, sub, picture, email_verified } = payload;

        const payloadObject = {
            email: email || "",
            first_name: given_name || "",
            last_name: family_name || "",
            social_id: sub,
            social_platform: "google",
            image: picture || "",
            image_thumbnail: picture || "",
            username: `google-user-${sub}`,
        };

        if (additionalFields && Object.keys(additionalFields).length > 0) {
            Object.keys(additionalFields).forEach((key) => {
                // @ts-ignore
                payloadObject[key] = additionalFields[key];
            });
        }

        const loggedInGoogleUser = await handleSocialDb({
            database: targetDbName,
            email: email || "",
            payload: payloadObject,
            social_platform: "google",
            res: response,
            social_id: sub,
            additionalFields,
            dbSchema,
        });

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        return { ...loggedInGoogleUser, dsqlUserId: "0" };

        ////////////////////////////////////////
    } catch (error) {
        return {
            success: false,
            msg: "User fetch Error",
        };

        ////////////////////////////////////////
    }
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

module.exports = localGoogleAuth;
