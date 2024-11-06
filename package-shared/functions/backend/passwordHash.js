// @ts-check

const { createHmac } = require("crypto");
//

/**
 * # Password Hash function
 * @param {string} password
 * @returns
 */
function hashPassword(password) {
    const hmac = createHmac(
        "sha512",
        process.env.DSQL_ENCRYPTION_PASSWORD || ""
    );
    hmac.update(password);
    let hashed = hmac.digest("base64");
    return hashed;
}

exports.hashPassword = hashPassword;

// export const comparePasswords = async (password) => {
//     const hmac = createHmac("sha512", process.env.DSQL_ENCRYPTION_PASSWORD);
//     hmac.update(password);
//     let hashed = hmac.digest("base64");

//     let dbPass = await global.DB_HANDLER(`SELECT * FROM users WHERE password = '${hashed}'`);
//     console.log(dbPass);
//     return dbPass;
// };
