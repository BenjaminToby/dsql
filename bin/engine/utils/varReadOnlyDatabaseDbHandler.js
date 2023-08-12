// @ts-check

const fs = require("fs");
const parseDbResults = require("./parseDbResults");
const dbHandler = require("./dbHandler");

/**
 *
 * @param {object} param0
 * @param {string} param0.queryString
 * @param {object} param0.database
 * @param {object[]} [param0.queryValuesArray]
 * @param {object | null} [param0.tableSchema]
 * @returns
 */
module.exports = async function varReadOnlyDatabaseDbHandler({ queryString, database, queryValuesArray, tableSchema }) {
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
        results = await dbHandler({ query: queryString, values: queryValuesArray, database: database });

        ////////////////////////////////////////
    } catch (error) {
        ////////////////////////////////////////

        console.log("\x1b[31mvarReadOnlyDatabaseDbHandler ERROR\x1b[0m =>", database, error.message);

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
        // deepcode ignore reDOS: <please specify a reason of ignoring this>
        const parsedResults = await parseDbResults({ unparsedResults: unparsedResults, tableSchema: tableSchema });
        return parsedResults;
    } else {
        return null;
    }
};
