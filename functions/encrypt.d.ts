export = encrypt;
/**
 *
 * @param {object} param0
 * @param {string} param0.data
 * @param {string} param0.encryptionKey
 * @param {string} param0.encryptionSalt
 * @returns {string | null}
 */
declare function encrypt({ data, encryptionKey, encryptionSalt }: {
    data: string;
    encryptionKey: string;
    encryptionSalt: string;
}): string | null;
