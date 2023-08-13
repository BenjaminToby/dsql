// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");
const https = require("https");
const encrypt = require("../../../functions/encrypt");
const camelJoinedtoCamelSpace = require("../../engine/utils/camelJoinedtoCamelSpace");
const githubLogin = require("./utils/githubLogin");
const handleSocialDb = require("./utils/handleSocialDb");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

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
 * @param {http.ServerResponse} params.res - HTTPS response object
 * @param {string} params.code
 * @param {string} [params.email]
 * @param {string} params.clientId
 * @param {string} params.clientSecret
 * @param {string[]} [params.additionalFields]
 * @param {import("../../../types/database-schema.td").DSQL_DatabaseSchemaType} params.dbSchema
 */
async function localGithubAuth({ res, code, email, clientId, clientSecret, additionalFields, dbSchema }) {
    try {
        /**
         * User auth
         *
         * @description Authenticate user
         */
        if (!code || !clientId || !clientSecret) {
            return {
                success: false,
                msg: "Missing query params",
            };
        }

        if (typeof code !== "string" || typeof clientId !== "string" || typeof clientSecret !== "string" || typeof database !== "string") {
            return {
                success: false,
                msg: "Wrong Parameters",
            };
        }

        /**
         * Create new user folder and file
         *
         * @description Create new user folder and file
         */
        const gitHubUser = await githubLogin({
            code: code,
            clientId: clientId,
            clientSecret: clientSecret,
        });

        if (!gitHubUser) {
            return {
                success: false,
                msg: "No github user returned",
            };
        }

        const targetDbName = database;

        const socialId = gitHubUser.name || gitHubUser.id || gitHubUser.login;
        const targetName = gitHubUser.name || gitHubUser.login;
        const nameArray = targetName?.match(/ /) ? targetName?.split(" ") : targetName?.match(/\-/) ? targetName?.split("-") : [targetName];

        const payload = {
            email: gitHubUser.email,
            first_name: camelJoinedtoCamelSpace(nameArray[0]) || "",
            last_name: camelJoinedtoCamelSpace(nameArray[1]) || "",
            social_id: socialId,
            social_platform: "github",
            image: gitHubUser.avatar_url,
            image_thumbnail: gitHubUser.avatar_url,
            username: "github-user-" + socialId,
        };

        if (additionalFields && Object.keys(additionalFields).length > 0) {
            Object.keys(additionalFields).forEach((key) => {
                // @ts-ignore
                payload[key] = additionalFields[key];
            });
        }

        const loggedInGithubUser = await handleSocialDb({
            database: targetDbName,
            email: gitHubUser.email,
            payload: payload,
            social_platform: "github",
            res: res,
            social_id: socialId,
            supEmail: email,
            additionalFields,
            dbSchema: dbSchema,
        });

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        return { ...loggedInGithubUser, dsqlUserId: "0" };

        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log("localGithubAuth error", error.message);

        return { success: false, msg: "Failed!" };
    }
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

module.exports = localGithubAuth;
