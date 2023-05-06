/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @param {Object} response - Http response object
 */
module.exports = function ({ response }) {
    /**
     * Check Encryption Keys
     *
     * @description Check Encryption Keys
     */
    response.setHeader("Set-Cookie", ["datasquirelAuthKey=none;max-age=0", "usertype=none;max-age=0", `refresh_properties=1;Max-Age=7000`]);

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    return {
        success: true,
        payload: "User Logged Out",
    };
};

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */