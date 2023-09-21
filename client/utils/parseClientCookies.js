/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */

/**
 * Parse request cookies
 * ==============================================================================
 *
 * @description This function takes in a request object and returns the cookies as a JS object
 *
 * @async
 *
 * @param {object} params - main params object
 * @param {object} params.request - HTTPS request object
 *
 * @returns {{}|null}
 */
module.exports = function () {
    /**
     * Check inputs
     *
     * @description Check inputs
     */

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /** @type {string|null} */
    const cookieString = document.cookie;

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
