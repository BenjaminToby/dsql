// @ts-check

const { scryptSync, createDecipheriv } = require("crypto");
const { Buffer } = require("buffer");

/**
 * @param {string} encryptedString
 * @returns {string | null}
 */
const decrypt = (encryptedString) => {
    const algorithm = "aes-192-cbc";
    const password = process.env.DSQL_ENCRYPTION_PASSWORD || "";
    const salt = process.env.DSQL_ENCRYPTION_SALT || "";

    let key = scryptSync(password, salt, 24);
    let iv = Buffer.alloc(16, 0);
    // @ts-ignore
    const decipher = createDecipheriv(algorithm, key, iv);

    try {
        let decrypted = decipher.update(encryptedString, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (error) {
        return null;
    }
};

module.exports = decrypt;
