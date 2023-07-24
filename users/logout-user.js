const parseCookies = require("../utils/functions/parseCookies");

/**
 * Logout user
 * ==============================================================================
 * @param {object} params - Single Param object containing params
 * @param {object} params.request - Http request object
 * @param {object} params.response - Http response object
 * @param {string} [params.database] - Target database name(slug): optional => If you don't
 * include this you will be logged out of all datasquirel websites instead of just the target
 * database
 *
 * @returns {{success: boolean, payload: string}}
 */
function logoutUser({ request, response, database }) {
    /**
     * Check Encryption Keys
     *
     * @description Check Encryption Keys
     */
    try {
        const cookies = parseCookies({ request });
        const cookiesKeys = Object.keys(cookies);

        const dbUid = cookies.dsqluid;
        const keyRegexp = new RegExp(`datasquirel_${dbUid}_${database}_auth_key`);
        const csrfRegexp = new RegExp(`datasquirel_${dbUid}_${database}_csrf`);

        const authKeyName = cookiesKeys.filter((cookieKey) => cookieKey.match(keyRegexp))[0];
        const csrfName = cookiesKeys.filter((cookieKey) => cookieKey.match(csrfRegexp))[0];

        console.log(authKeyName, csrfName);

        if (authKeyName && csrfName) {
            response.setHeader("Set-Cookie", [`${authKeyName}=null;samesite=strict;path=/;HttpOnly=true;Secure=true`, `${csrfName}=null;samesite=strict;path=/;HttpOnly=true`, `dsqluid=null;samesite=strict;path=/;HttpOnly=true`]);
        } else {
            const allKeys = cookiesKeys.filter((cookieKey) => cookieKey.match(/datasquirel_.*_auth_key/));
            const allCsrfs = cookiesKeys.filter((cookieKey) => cookieKey.match(/datasquirel_.*_csrf/));

            response.setHeader("Set-Cookie", [...allKeys.map((key) => `${key}=null;samesite=strict;path=/;HttpOnly=true;Secure=true`), ...allCsrfs.map((csrf) => `${csrf}=null;samesite=strict;path=/;HttpOnly=true`), `dsqluid=null;samesite=strict;path=/;HttpOnly=true`]);
        }

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
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = logoutUser;
