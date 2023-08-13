// @ts-check

const { scryptSync, createDecipheriv } = require("crypto");
const { Buffer } = require("buffer");

/**
 *
 * @param {object} param0
 * @param {string} param0.encryptedString
 * @param {string} param0.encryptionKey
 * @param {string} param0.encryptionSalt
 * @returns
 */
const decrypt = ({ encryptedString, encryptionKey, encryptionSalt }) => {
    if (!encryptedString?.match(/./)) {
        console.log("Encrypted string is invalid");
        return encryptedString;
    }

    if (!encryptionKey?.match(/.{8,}/)) {
        console.log("Decrption key is invalid");
        return encryptedString;
    }

    if (!encryptionSalt?.match(/.{8,}/)) {
        console.log("Decrption salt is invalid");
        return encryptedString;
    }

    const algorithm = "aes-192-cbc";

    let key = scryptSync(encryptionKey, encryptionSalt, 24);
    let iv = Buffer.alloc(16, 0);
    const decipher = createDecipheriv(algorithm, key, iv);

    try {
        let decrypted = decipher.update(encryptedString, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    } catch (error) {
        console.log("Error in decrypting =>", error.message);
        return encryptedString;
    }
};

module.exports = decrypt;
