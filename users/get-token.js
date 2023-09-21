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
 * Get just the access token for user
 * ==============================================================================
 * @description This Function takes in a request object and returns a user token
 * string and csrf token string
 *
 * @param {Object} params - Arg
 * @param {http.IncomingMessage} params.request - Http request object
 * @param {string} params.encryptionKey - Encryption Key
 * @param {string} params.encryptionSalt - Encryption Salt
 * @param {string} params.database - Database Name
 *
 * @returns {{ key: string | undefined, csrf: string | undefined }}
 */
function getToken({ request, encryptionKey, encryptionSalt, database }) {
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
            return { key: undefined, csrf: undefined };
        }

        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        let userObject = JSON.parse(userPayload);

        if (!userObject.csrf_k) {
            return { key: undefined, csrf: undefined };
        }

        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */

        /**
         * Return User Object
         *
         * @description Return User Object
         */
        return { key, csrf };
    } catch (error) {
        /**
         * Return User Object
         *
         * @description Return User Object
         */
        return {
            key: undefined,
            csrf: undefined,
        };
    }
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = getToken;
