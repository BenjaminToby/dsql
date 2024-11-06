// @ts-check

const DSQL_USER_DB_HANDLER = require("../../utils/backend/global-db/DSQL_USER_DB_HANDLER");
const parseDbResults = require("./parseDbResults");
const serverError = require("./serverError");

/**
 *
 * @param {object} param0
 * @param {string} param0.queryString
 * @param {string} param0.database
 * @param {boolean} [param0.local]
 * @param {import("../../types").DSQL_TableSchemaType | null} [param0.tableSchema]
 * @param {string[]} [param0.queryValuesArray]
 * @returns
 */
module.exports = async function fullAccessDbHandler({
    queryString,
    database,
    tableSchema,
    queryValuesArray,
    local,
}) {
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

        results = await DSQL_USER_DB_HANDLER({
            paradigm: "Full Access",
            database,
            queryString,
            queryValues: queryValuesArray,
        });

        ////////////////////////////////////////
    } catch (/** @type {any} */ error) {
        ////////////////////////////////////////

        serverError({
            component: "fullAccessDbHandler",
            message: error.message,
        });

        /**
         * Return error
         */
        return error.message;
    }

    /**
     * Return results
     *
     * @description Return results add to cache if "req" param is passed
     */
    if (results && tableSchema) {
        const unparsedResults = results;
        const parsedResults = await parseDbResults({
            unparsedResults: unparsedResults,
            tableSchema: tableSchema,
        });
        return parsedResults;
    } else if (results) {
        return results;
    } else {
        return null;
    }
};
