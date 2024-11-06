// @ts-check

const fs = require("fs");
const serverError = require("./serverError");
const parseDbResults = require("./parseDbResults");
const DSQL_USER_DB_HANDLER = require("../../utils/backend/global-db/DSQL_USER_DB_HANDLER");

/**
 *
 * @param {object} param0
 * @param {string} param0.queryString
 * @param {string} param0.database
 * @param {string[]} [param0.queryValuesArray]
 * @param {import("../../types").DSQL_TableSchemaType} [param0.tableSchema]
 * @returns
 */
module.exports = async function varReadOnlyDatabaseDbHandler({
    queryString,
    database,
    queryValuesArray,
    tableSchema,
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
        results = await DSQL_USER_DB_HANDLER({
            paradigm: "Read Only",
            database,
            queryString,
            queryValues: queryValuesArray,
        });

        ////////////////////////////////////////
    } catch (/** @type {any} */ error) {
        ////////////////////////////////////////

        serverError({
            component: "varReadOnlyDatabaseDbHandler",
            message: error.message,
            noMail: true,
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
    if (results) {
        const unparsedResults = results;
        const parsedResults = await parseDbResults({
            unparsedResults: unparsedResults,
            tableSchema: tableSchema,
        });
        return parsedResults;
    } else {
        return null;
    }
};
