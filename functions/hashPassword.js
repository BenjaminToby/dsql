const { createHmac } = require("crypto");

/**
 * # Hash password Function
 * @param {string} password
 * @returns {string}
 */
module.exports = function hashPassword(password) {
    const hmac = createHmac("sha512", process.env.ENCRYPTION_PASSWORD);
    hmac.update(password);
    let hashed = hmac.digest("base64");
    return hashed;
};
