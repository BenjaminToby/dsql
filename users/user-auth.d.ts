export = userAuth;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Authenticate User from request
 * ==============================================================================
 * @description This Function takes in a request object and returns a user object
 * with the user's data
 *
 * @param {Object} params - Arg
 * @param {http.IncomingMessage} params.request - Http request object
 * @param {string} params.encryptionKey - Encryption Key
 * @param {string} params.encryptionSalt - Encryption Salt
 * @param {("deep" | "normal")} [params.level] - Optional. "Deep" value indicates an extra layer of security
 * @param {string} params.database - Database Name
 * @param {string} [params.token] - access token to use instead of getting from cookie header
 *
 * @returns { import("../package-shared/types").AuthenticatedUser }
 */
declare function userAuth({ request, encryptionKey, encryptionSalt, level, database, token, }: {
    request: http.IncomingMessage;
    encryptionKey: string;
    encryptionSalt: string;
    level?: ("deep" | "normal");
    database: string;
    token?: string;
}): import("../package-shared/types").AuthenticatedUser;
import http = require("http");
