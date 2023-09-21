// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");
const decrypt = require("../functions/decrypt");
const parseCookies = require("../utils/functions/parseCookies");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {object} AuthenticatedUserObject
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../types/user.td").DATASQUIREL_LoggedInUser | null} payload - Payload
 * @property {string | unknown} [msg] - Response Message
 */

/**
 * Authenticate User from request
 * ==============================================================================
 * @description This Function takes in a request object and returns a user object
 * with the user's data
 *
 * @param {Object} params - Arg
 * @param {http.IncomingMessage} params.request - Http request object
 * @param {string} params.encryptionKey - Encryption Key
 * @param {string} params.encryptionSalt - Encryption Salt
 * @param {("deep" | "normal")} [params.level] - Optional. "Deep" value indicates an extra layer of security
 * @param {string} params.database - Database Name
 *
 * @returns { AuthenticatedUserObject }
 */
function userAuth({ request, encryptionKey, encryptionSalt, level, database }) {
    try {
        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        const cookies = parseCookies({ request });
        const dsqluid = cookies.dsqluid;
        const authKeyName = `datasquirel_${dsqluid}_${database}_auth_key`;
        const csrfName = `datasquirel_${dsqluid}_${database}_csrf`;

        const key = cookies[authKeyName];
        const csrf = cookies[csrfName];

        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        let userPayload = decrypt({
            encryptedString: key,
            encryptionKey,
            encryptionSalt,
        });

        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        if (!userPayload) {
            return {
                success: false,
                payload: null,
                msg: "Couldn't Decrypt cookie",
            };
        }

        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        let userObject = JSON.parse(userPayload);

        if (!userObject.csrf_k) {
            return {
                success: false,
                payload: null,
                msg: "No CSRF_K in decrypted payload",
            };
        }

        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */

        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        if (level?.match(/deep/i) && !csrf?.match(new RegExp(`${userObject.csrf_k}`))) {
            return {
                success: false,
                payload: null,
                msg: "CSRF_K requested but does not match payload",
            };
        }

        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */

        /**
         * Return User Object
         *
         * @description Return User Object
         */
        return {
            success: true,
            payload: userObject,
        };
    } catch (error) {
        /**
         * Return User Object
         *
         * @description Return User Object
         */
        return {
            success: false,
            payload: null,
            msg: error,
        };
    }
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = userAuth;
