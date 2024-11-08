export = googleAuth;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * @typedef {object | null} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../../types/user.td").DATASQUIREL_LoggedInUser | null} user - Returned User
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
 * @param {string} params.token - Google access token gotten from the client side
 * @param {string} params.database - Target database name(slug)
 * @param {string} params.clientId - Google client id
 * @param {http.ServerResponse} params.response - HTTPS response object
 * @param {string} params.encryptionKey - Encryption key
 * @param {string} params.encryptionSalt - Encryption salt
 * @param {object} [params.additionalFields] - Additional Fields to be added to the user object
 *
 * @returns { Promise<FunctionReturn> }
 */
declare function googleAuth({ key, token, database, clientId, response, encryptionKey, encryptionSalt, additionalFields, }: {
    key: string;
    token: string;
    database: string;
    clientId: string;
    response: http.ServerResponse;
    encryptionKey: string;
    encryptionSalt: string;
    additionalFields?: object;
}): Promise<FunctionReturn>;
declare namespace googleAuth {
    export { FunctionReturn };
}
import http = require("http");
type FunctionReturn = object | null;
