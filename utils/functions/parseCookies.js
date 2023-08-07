// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const http = require("http");

/**
 * Parse request cookies
 * ==============================================================================
 *
 * @description This function takes in a request object and returns the cookies as a JS object
 *
 * @async
 *
 * @param {object} params - main params object
 * @param {http.IncomingMessage} params.request - HTTPS request object
 *
 * @returns {* | null}
 */
module.exports = function ({ request }) {
    /**
     * Check inputs
     *
     * @description Check inputs
     */

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /** @type {string | undefined} */
    const cookieString = request.headers.cookie;

    if (!cookieString || typeof cookieString !== "string") {
        return null;
    }

    /** @type {string[]} */
    const cookieSplitArray = cookieString.split(";");

    let cookieObject = {};

    cookieSplitArray.forEach((keyValueString) => {
        const [key, value] = keyValueString.split("=");
        if (key && typeof key == "string") {
            cookieObject[key.replace(/^ +| +$/, "")] = value && typeof value == "string" ? value.replace(/^ +| +$/, "") : null;
        }
    });

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */

    return cookieObject;
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
