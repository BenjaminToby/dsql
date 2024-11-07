// @ts-check

const fs = require("fs");

/**
 * @returns {string | (import("tls").SecureContextOptions & { rejectUnauthorized?: boolean | undefined;}) | undefined}
 */
module.exports = function grabDbSSL() {
    const SSL_DIR = process.env.DSQL_SSL_DIR;
    if (!SSL_DIR?.match(/./)) return undefined;

    const caFilePath = `${SSL_DIR}/ca-cert.pem`;
    if (!fs.existsSync(caFilePath)) {
        console.log(`${caFilePath} does not exist`);

        return undefined;
    }

    return {
        ca: fs.readFileSync(`${SSL_DIR}/ca-cert.pem`),
    };
};
