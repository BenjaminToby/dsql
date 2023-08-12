const { scryptSync, createDecipheriv } = require("crypto");
const { Buffer } = require("buffer");

const decrypt = ({ encryptedString, encryptionKey, encryptionSalt }) => {
    const algorithm = "aes-192-cbc";
    const password = encryptionKey;

    if (!encryptionKey?.match(/.{8,}/)) {
        console.log("Decrption key is invalid");
        return data;
    }
    if (!encryptionSalt?.match(/.{8,}/)) {
        console.log("Decrption salt is invalid");
        return data;
    }

    let key = scryptSync(password, encryptionSalt, 24);
    let iv = Buffer.alloc(16, 0);
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
