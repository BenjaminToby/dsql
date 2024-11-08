export = decrypt;
/**
 *
 * @param {object} param0
 * @param {string} param0.encryptedString
 * @param {string} param0.encryptionKey
 * @param {string} param0.encryptionSalt
 * @returns
 */
declare function decrypt({ encryptedString, encryptionKey, encryptionSalt }: {
    encryptedString: string;
    encryptionKey: string;
    encryptionSalt: string;
}): string;
