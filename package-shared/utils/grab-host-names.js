// @ts-check

const https = require("https");
const http = require("http");

/**
 * @typedef {object} GrabHostNamesReturn
 * @property {string} host
 * @property {number | string} port
 * @property {typeof http | typeof https} scheme
 */

/**
 *  # Grab Names For Query
 * @returns {GrabHostNamesReturn}
 */
function grabHostNames() {
    const scheme = process.env.DSQL_HTTP_SCHEME;
    const localHost = process.env.DSQL_LOCAL_HOST;
    const localHostPort = process.env.DSQL_LOCAL_HOST_PORT;
    const remoteHost = process.env.DSQL_API_REMOTE_HOST?.match(/.*\..*/)
        ? process.env.DSQL_API_REMOTE_HOST
        : undefined;
    const remoteHostPort = process.env.DSQL_API_REMOTE_HOST_PORT?.match(/./)
        ? process.env.DSQL_API_REMOTE_HOST_PORT
        : undefined;

    return {
        host: remoteHost || localHost || "datasquirel.com",
        port: remoteHostPort || localHostPort || 443,
        scheme: scheme?.match(/^http$/i) ? http : https,
    };
}

module.exports = grabHostNames;
