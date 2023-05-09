/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @param {Object} response - Http response object
 */
module.exports = function ({ request, response }) {
    /**
     * Check Encryption Keys
     *
     * @description Check Encryption Keys
     */
    try {
        const authKeyName = request.cookies.filter((cookie) => cookie.match(/datasquirel_.*_auth_key/))[0];
        const csrfName = request.cookies.filter((cookie) => cookie.match(/datasquirel_.*_csrf/))[0];

        response.setHeader("Set-Cookie", [`${authKeyName}=null;samesite=strict;path=/;HttpOnly=true;Secure=true`, `${csrfName}=null;samesite=strict;path=/;HttpOnly=true`, `dsqluid=null;samesite=strict;path=/;HttpOnly=true`]);

        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */

        return {
            success: true,
            payload: "User Logged Out",
        };

        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */
    } catch (error) {
        console.log(error.message);

        return {
            success: false,
            payload: "Logout Failed",
        };
    }

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */
};

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
