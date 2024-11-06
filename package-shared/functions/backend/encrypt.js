// @ts-check

const { scryptSync, createCipheriv } = require("crypto");
const { Buffer } = require("buffer");
const serverError = require("./serverError");

/**
 * @async
 * @param {string} data
 * @param {string} [encryptionKey]
 * @param {string} [encryptionSalt]
 * @returns {string | null}
 */
const encrypt = (data, encryptionKey, encryptionSalt) => {
    const algorithm = "aes-192-cbc";
    const password = encryptionKey
        ? encryptionKey
        : process.env.DSQL_ENCRYPTION_PASSWORD || "";

    /** ********************* Generate key */
    const salt = encryptionSalt
        ? encryptionSalt
        : process.env.DSQL_ENCRYPTION_SALT || "";
    let key = scryptSync(password, salt, 24);
    let iv = Buffer.alloc(16, 0);
    // @ts-ignore
    const cipher = createCipheriv(algorithm, key, iv);

    /** ********************* Encrypt data */
    try {
        let encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    } catch (/** @type {any} */ error) {
        serverError({
            component: "encrypt",
            message: error.message,
        });
        return null;
    }
};

module.exports = encrypt;
