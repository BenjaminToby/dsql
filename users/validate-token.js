// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");
const decrypt = require("../functions/decrypt");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Validate Token
 * ==============================================================================
 * @description This Function takes in a encrypted token and returns a user object
 *
 * @param {Object} params - Arg
 * @param {string} params.token - Encrypted Token
 * @param {string} params.encryptionKey - Encryption Key
 * @param {string} params.encryptionSalt - Encryption Salt
 * @param {("deep" | "normal")?} [params.level] - Optional. "Deep" value indicates an extra layer of security
 * @param {string} params.database - Database Name
 *
 * @returns { import("@/package-shared/types").DATASQUIREL_LoggedInUser | null}
 */
function validateToken({ token, encryptionKey, encryptionSalt }) {
    try {
        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        const key = token;

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
            return null;
        }

        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        let userObject = JSON.parse(userPayload);

        if (!userObject.csrf_k) {
            return null;
        }

        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */

        /**
         * Return User Object
         *
         * @description Return User Object
         */
        return userObject;
    } catch (error) {
        /**
         * Return User Object
         *
         * @description Return User Object
         */
        return null;
    }
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = validateToken;
