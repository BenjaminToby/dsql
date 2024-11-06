// @ts-check

const { IncomingMessage } = require("http");
const decrypt = require("./decrypt");
const parseCookies = require("../../../utils/functions/parseCookies");

/**
 * @async
 * @param {IncomingMessage} req - https request object
 *
 * @returns {Promise<({ email: string, password: string, authKey: string, logged_in_status: boolean, date: number } | null)>}
 */
module.exports = async function (req) {
    const cookies = parseCookies({ request: req });
    /** ********************* Check for existence of required cookie */
    if (!cookies?.datasquirelSuAdminUserAuthKey) {
        return null;
    }

    /** ********************* Grab the payload */
    let userPayload = decrypt(cookies.datasquirelSuAdminUserAuthKey);

    /** ********************* Return if no payload */
    if (!userPayload) return null;

    /** ********************* Parse the payload */
    let userObject = JSON.parse(userPayload);

    if (userObject.password !== process.env.DSQL_USER_KEY) return null;
    if (userObject.authKey !== process.env.DSQL_SPECIAL_KEY) return null;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /** ********************* return user object */
    return userObject;
};
