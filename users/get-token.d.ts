export = getToken;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Get just the access token for user
 * ==============================================================================
 * @description This Function takes in a request object and returns a user token
 * string and csrf token string
 *
 * @param {Object} params - Arg
 * @param {http.IncomingMessage} params.request - Http request object
 * @param {string} params.encryptionKey - Encryption Key
 * @param {string} params.encryptionSalt - Encryption Salt
 * @param {string} params.database - Database Name
 *
 * @returns {{ key: string | undefined, csrf: string | undefined }}
 */
declare function getToken({ request, encryptionKey, encryptionSalt, database }: {
    request: http.IncomingMessage;
    encryptionKey: string;
    encryptionSalt: string;
    database: string;
}): {
    key: string | undefined;
    csrf: string | undefined;
};
import http = require("http");
