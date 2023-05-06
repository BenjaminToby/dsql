const { scryptSync, createCipheriv } = require("crypto");
const { Buffer } = require("buffer");

const encrypt = ({ data, encryptionKey, encryptionSalt }) => {
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
        return null;
    }
};

module.exports = encrypt;
