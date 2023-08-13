const { scryptSync, createDecipheriv } = require("crypto");
const { Buffer } = require("buffer");

const decrypt = ({ encryptedString, encryptionKey, encryptionSalt }) => {
    if (!encryptedString?.match(/.}/)) {
        console.log("Encrypted string is invalid");
        console.log("Encrypted string =>", encryptedString);
        return data;
    }

    if (!encryptionKey?.match(/.{8,}/)) {
        console.log("Decrption key is invalid");
        return data;
    }

    if (!encryptionSalt?.match(/.{8,}/)) {
        console.log("Decrption salt is invalid");
        return data;
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
        console.log("encryptedString =>", encryptedString);
        console.log("encryptionKey =>", encryptionKey);
        console.log("encryptionSalt =>", encryptionSalt);
        return data;
    }
};

module.exports = decrypt;
