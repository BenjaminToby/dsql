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
    response.setHeader("Set-Cookie", ["datasquirelAuthKey=null;samesite=strict;path=/;HttpOnly=true;Secure=true", "csrf=null;samesite=strict;path=/;HttpOnly=true"]);

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
