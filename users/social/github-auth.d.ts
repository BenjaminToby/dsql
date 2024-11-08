export = githubAuth;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * @typedef {object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{id: number, first_name: string, last_name: string, csrf_k: string, social_id: string} | null} user - Returned User
 * @property {number} [dsqlUserId] - Dsql User Id
 * @property {string} [msg] - Response message
 */
/**
 * SERVER FUNCTION: Login with google Function
 * ==============================================================================
 *
 * @async
 *
 * @param {object} params - main params object
 * @param {string} params.key - API full access key
 * @param {string} params.code - Github access code gotten from the client side
 * @param {string?} params.email - Email gotten from the client side if available
 * @param {string} params.database - Target database name(slug)
 * @param {string} params.clientId - Github client id
 * @param {string} params.clientSecret - Github client Secret
 * @param {http.ServerResponse} params.response - HTTPS response object
 * @param {string} params.encryptionKey - Encryption key
 * @param {string} params.encryptionSalt - Encryption salt
 * @param {object} [params.additionalFields] - Additional Fields to be added to the user object
 *
 * @returns { Promise<FunctionReturn | undefined> }
 */
declare function githubAuth({ key, code, email, database, clientId, clientSecret, response, encryptionKey, encryptionSalt, additionalFields, }: {
    key: string;
    code: string;
    email: string | null;
    database: string;
    clientId: string;
    clientSecret: string;
    response: http.ServerResponse;
    encryptionKey: string;
    encryptionSalt: string;
    additionalFields?: object;
}): Promise<FunctionReturn | undefined>;
declare namespace githubAuth {
    export { FunctionReturn };
}
import http = require("http");
type FunctionReturn = {
    /**
     * - Did the function run successfully?
     */
    success: boolean;
    /**
     * - Returned User
     */
    user: {
        id: number;
        first_name: string;
        last_name: string;
        csrf_k: string;
        social_id: string;
    } | null;
    /**
     * - Dsql User Id
     */
    dsqlUserId?: number;
    /**
     * - Response message
     */
    msg?: string;
};
