/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const decrypt = require("../functions/decrypt");

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
 * @param {Object} request - Http request object
 * @param {String} encryptionKey - Encryption Key
 * @param {String} encryptionSalt - Encryption Salt
 * @param {String} level - Optional. "Deep" value indicates an extra layer of security
 * @param {String} database - Database Name
 */
module.exports = function ({ request, encryptionKey, encryptionSalt, level, database }) {
    try {
        /**
         * Grab the payload
         *
         * @description Grab the payload
         */
        const dsqluid = request.cookies.dsqluid;
        const authKeyName = `datasquirel_${dsqluid}_${database}_auth_key`;
        const csrfName = `datasquirel_${dsqluid}_${database}_csrf`;

        const key = request.cookies[authKeyName];
        const csrf = request.cookies[csrfName];

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
            msg: error.message,
        };
    }
};

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
