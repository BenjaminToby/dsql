/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const decrypt = require("../functions/decrypt");
const parseCookies = require("../utils/functions/parseCookies");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{
 *   id: number,
 *   first_name: string,
 *   last_name: string,
 *   username: string,
 *   email: string,
 *   phone: string,
 *   social_id: [string],
 *   image: string,
 *   image_thumbnail: string,
 *   verification_status: [number=0],
 *   social_login: [number],
 *   social_platform: [string],
 *   csrf_k: string,
 *   more_data: [string],
 *   logged_in_status: boolean,
 *   date: string,
 * }} payload - Payload
 * @property {string} [msg] - Response Message
 */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @param {Object} params - Arg
 * @param {Object} params.request - Http request object
 * @param {String} params.encryptionKey - Encryption Key
 * @param {String} params.encryptionSalt - Encryption Salt
 * @param {String} params.level - Optional. "Deep" value indicates an extra layer of security
 * @param {String} params.database - Database Name
 *
 * @returns { FunctionReturn }
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
            msg: error.message,
        };
    }
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = userAuth;
