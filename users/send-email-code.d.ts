export = sendEmailCode;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Send Email Code to a User
 * ==============================================================================
 * @async
 *
 * @param {object} params - Single Param object containing params
 * @param {String} params.key - FULL ACCESS API Key
 * @param {String} params.database - Target Database
 * @param {string} params.email Login Email/Username and Password
 * @param {http.ServerResponse} params.response - Http response object
 * @param {String} params.encryptionKey - Encryption Key
 * @param {String} params.encryptionSalt - Encryption Salt
 * @param {string} [params.temp_code_field] - Database table field name for temporary code
 * @param {string} [params.mail_domain]
 * @param {string} [params.mail_username]
 * @param {string} [params.mail_password]
 * @param {number} [params.mail_port]
 * @param {string} [params.sender]
 *
 * @returns { Promise<boolean>}
 */
declare function sendEmailCode({ key, email, database, encryptionKey, encryptionSalt, temp_code_field, mail_domain, mail_password, mail_username, mail_port, sender, }: {
    key: string;
    database: string;
    email: string;
    response: http.ServerResponse;
    encryptionKey: string;
    encryptionSalt: string;
    temp_code_field?: string;
    mail_domain?: string;
    mail_username?: string;
    mail_password?: string;
    mail_port?: number;
    sender?: string;
}): Promise<boolean>;
import http = require("http");
