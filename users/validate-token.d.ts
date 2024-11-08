export = validateToken;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Validate Token
 * ==============================================================================
 * @description This Function takes in a encrypted token and returns a user object
 *
 * @param {Object} params - Arg
 * @param {string} params.token - Encrypted Token
 * @param {string} params.encryptionKey - Encryption Key
 * @param {string} params.encryptionSalt - Encryption Salt
 * @param {("deep" | "normal")?} [params.level] - Optional. "Deep" value indicates an extra layer of security
 * @param {string} params.database - Database Name
 *
 * @returns { import("../package-shared/types").DATASQUIREL_LoggedInUser | null}
 */
declare function validateToken({ token, encryptionKey, encryptionSalt }: {
    token: string;
    encryptionKey: string;
    encryptionSalt: string;
    level?: ("deep" | "normal") | null;
    database: string;
}): import("../package-shared/types").DATASQUIREL_LoggedInUser | null;
