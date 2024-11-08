export = encrypt;
/**
 * @async
 * @param {string} data
 * @param {string} [encryptionKey]
 * @param {string} [encryptionSalt]
 * @returns {string | null}
 */
declare function encrypt(data: string, encryptionKey?: string, encryptionSalt?: string): string | null;
