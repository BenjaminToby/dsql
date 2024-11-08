export = loginUser;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Login A user
 * ==============================================================================
 * @async
 *
 * @param {object} params - Single Param object containing params
 * @param {String} params.key - FULL ACCESS API Key
 * @param {String} params.database - Target Database
 * @param {{
 *  email?: string,
 *  username?: string,
 *  password: string,
 * }} params.payload Login Email/Username and Password
 * @param {string[]} [params.additionalFields] - Additional Fields to be added to the user object
 * @param {http.ServerResponse} params.response - Http response object
 * @param {String} params.encryptionKey - Encryption Key
 * @param {String} params.encryptionSalt - Encryption Salt
 * @param {boolean} [params.email_login] - Email only Login
 * @param {string} [params.email_login_code] - Email login code
 * @param {string} [params.temp_code_field] - Database table field name for temporary code
 * @param {boolean} [params.token] - Send access key as part of response body?
 *
 * @returns { Promise<import("../package-shared/types").AuthenticatedUser>}
 */
declare function loginUser({ key, payload, database, additionalFields, response, encryptionKey, encryptionSalt, email_login, email_login_code, temp_code_field, token, }: {
    key: string;
    database: string;
    payload: {
        email?: string;
        username?: string;
        password: string;
    };
    additionalFields?: string[];
    response: http.ServerResponse;
    encryptionKey: string;
    encryptionSalt: string;
    email_login?: boolean;
    email_login_code?: string;
    temp_code_field?: string;
    token?: boolean;
}): Promise<import("../package-shared/types").AuthenticatedUser>;
import http = require("http");
