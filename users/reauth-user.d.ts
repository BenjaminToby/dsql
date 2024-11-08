export = reauthUser;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {object} params - Single Param object containing params
 * @param {String} params.key - API Key
 * @param {String} params.database - Target Database
 * @param {http.ServerResponse} params.response - Http response object
 * @param {http.IncomingMessage} params.request - Http request object
 * @param {("deep" | "normal")} [params.level] - Authentication level
 * @param {String} params.encryptionKey - Encryption Key
 * @param {String} params.encryptionSalt - Encryption Salt
 *  @param {string[]} [params.additionalFields] - Additional Fields to be added to the user object
 * @param {string} [params.token] - access token to use instead of getting from cookie header
 *
 * @returns { Promise<import("../package-shared/types").ReauthUserFunctionReturn> }
 */
declare function reauthUser({ key, database, response, request, level, encryptionKey, encryptionSalt, additionalFields, token, }: {
    key: string;
    database: string;
    response: http.ServerResponse;
    request: http.IncomingMessage;
    level?: ("deep" | "normal");
    encryptionKey: string;
    encryptionSalt: string;
    additionalFields?: string[];
    token?: string;
}): Promise<import("../package-shared/types").ReauthUserFunctionReturn>;
import http = require("http");
