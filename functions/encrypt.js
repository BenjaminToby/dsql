// @ts-check

const { scryptSync, createCipheriv } = require("crypto");
const { Buffer } = require("buffer");

/**
 *
 * @param {object} param0
 * @param {string} param0.data
 * @param {string} param0.encryptionKey
 * @param {string} param0.encryptionSalt
 * @returns {string | null}
 */
const encrypt = ({ data, encryptionKey, encryptionSalt }) => {
    if (!data?.match(/./)) {
        console.log("Encryption string is invalid");
        return data;
    }
    if (!encryptionKey?.match(/.{8,}/)) {
        console.log("Encryption key is invalid");
        return data;
    }
    if (!encryptionSalt?.match(/.{8,}/)) {
        console.log("Encryption salt is invalid");
        return data;
    }

    const algorithm = "aes-192-cbc";
    const password = encryptionKey;

    let key = scryptSync(password, encryptionSalt, 24);
    let iv = Buffer.alloc(16, 0);
    const cipher = createCipheriv(algorithm, key, iv);

    try {
        let encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    } catch (error) {
        console.log("Error in encrypting =>", error.message);
        return data;
    }
};

module.exports = encrypt;
