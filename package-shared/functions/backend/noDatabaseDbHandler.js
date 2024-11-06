// @ts-check

const fs = require("fs");
const serverError = require("./serverError");
const NO_DB_HANDLER = require("../../../package-shared/utils/backend/global-db/NO_DB_HANDLER");

/**
 * Create database from Schema Function
 * ==============================================================================
 * @param {string} queryString - Query String
 * @returns {Promise<any>}
 */
module.exports = async function noDatabaseDbHandler(queryString) {
    process.env.NODE_ENV?.match(/dev/) &&
        fs.appendFileSync(
            "./.tmp/sqlQuery.sql",
            queryString + "\n" + Date() + "\n\n\n",
            "utf8"
        );

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let results;

    /**
     * Fetch from db
     *
     * @description Fetch data from db if no cache
     */
    try {
        /** ********************* Run Query */
        results = await NO_DB_HANDLER(queryString);

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (/** @type {any} */ error) {
        serverError({
            component: "noDatabaseDbHandler",
            message: error.message,
        });

        console.log("ERROR in noDatabaseDbHandler =>", error.message);
    }

    /**
     * Return results
     *
     * @description Return results add to cache if "req" param is passed
     */
    if (results) {
        return results;
    } else {
        return null;
    }
};
