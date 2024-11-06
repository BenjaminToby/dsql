// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const fs = require("fs");
// const handleNodemailer = require("./handleNodemailer");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @param {{
 *  user?: { id?: number | string, first_name?: string, last_name?: string, email?: string } & *,
 *  message: string,
 *  component?: string,
 *  noMail?: boolean,
 * }} params - user id
 *
 * @returns {Promise<void>}
 */
module.exports = async function serverError({
    user,
    message,
    component,
    noMail,
}) {
    const log = `🚀 SERVER ERROR ===========================\nUser Id: ${
        user?.id
    }\nUser Name: ${user?.first_name} ${user?.last_name}\nUser Email: ${
        user?.email
    }\nError Message: ${message}\nComponent: ${component}\nDate: ${Date()}\n========================================`;

    if (!fs.existsSync(`./.tmp/error.log`)) {
        fs.writeFileSync(`./.tmp/error.log`, "", "utf-8");
    }

    const initialText = fs.readFileSync(`./.tmp/error.log`, "utf-8");

    fs.writeFileSync(`./.tmp/error.log`, log);
    fs.appendFileSync(`./.tmp/error.log`, `\n\n\n\n\n${initialText}`);
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
