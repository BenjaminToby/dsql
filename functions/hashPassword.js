/** # MODULE TRACE 
======================================================================
 * Detected 4 files that call this module. The files are listed below:
======================================================================
 * `require` Statement Found in [add-user.js] => file:///d:\GitHub\dsql\engine\user\add-user.js
 * `require` Statement Found in [login-user.js] => file:///d:\GitHub\dsql\engine\user\login-user.js
 * `require` Statement Found in [googleLogin.js] => file:///d:\GitHub\dsql\engine\user\social\utils\googleLogin.js
 * `require` Statement Found in [update-user.js] => file:///d:\GitHub\dsql\engine\user\update-user.js
==== MODULE TRACE END ==== */

// @ts-check

const { createHmac } = require("crypto");

/**
 * # Hash password Function
 * @param {object} param0
 * @param {string} param0.password - Password to hash
 * @param {string} param0.encryptionKey - Encryption key
 * @returns {string}
 */
module.exports = function hashPassword({ password, encryptionKey }) {
    const hmac = createHmac("sha512", encryptionKey);
    hmac.update(password);
    let hashed = hmac.digest("base64");
    return hashed;
};
