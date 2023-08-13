// @ts-check

const { createHmac } = require("crypto");

/**
 * # Hash password Function
 * @param {string} password
 * @returns {string}
 */
module.exports = function hashPassword(password) {
    const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
    const hmac = createHmac("sha512", encryptionKey);
    hmac.update(password);
    let hashed = hmac.digest("base64");
    return hashed;
};
