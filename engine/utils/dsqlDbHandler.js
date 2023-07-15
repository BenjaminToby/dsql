const fs = require("fs");
const parseDbResults = require("./parseDbResults");

/**
 * DB handler for specific database
 * ==============================================================================
 * @async
 * @param {object} params - Single object params
 * @param {string} params.queryString - SQL string
 * @param {string[]?} params.queryValuesArray - Values Array
 * @param {string} params.database - Database name
 * @param {DSQL_TableSchemaType?} params.tableSchema - Table schema
 * @param {string} params.dbHost - Database host
 * @param {string} params.dbUsername - Database username
 * @param {string} params.dbPassword - Database password
 * @param {string?} params.encryptionKey - Encryption key
 * @param {string?} params.encryptionSalt - Encryption salt
 *
 * @returns {Promise<object[]|null>}
 */
async function dsqlDbHandler({ queryString, queryValuesArray, database, tableSchema, dbHost, dbUsername, dbPassword, encryptionKey, encryptionSalt }) {
    const mysql = require("serverless-mysql")({
        config: {
            host: dbHost,
            user: dbUsername,
            password: dbPassword,
            database: database.toString().replace(/[^a-z0-9\_\-]/g, ""),
            charset: "utf8mb4",
        },
    });

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let results;

    /**
     * Check if query values array is an array
     */
    if (!queryString || !queryValuesArray || !Array.isArray(queryValuesArray) || !queryValuesArray[0]) {
        return null;
    }
    /**
     * Fetch from db
     *
     * @description Fetch data from db if no cache
     */
    try {
        /**
         * Run Query
         */
        results = await mysql.query(queryString, queryValuesArray);

        /**
         * Clean up
         */
        await mysql.end();
    } catch (error) {
        /**
         * Handle error and clean up
         */
        console.log("\x1b[31mDSQL Database Handler ERROR\x1b[0m =>", database, error.message);

        /**
         * Clean up
         */
        await mysql.end();

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
        try {
            const unparsedResults = JSON.parse(JSON.stringify(results));
            const parsedResults = parseDbResults({ unparsedResults: unparsedResults, tableSchema: tableSchema, encryptionKey, encryptionSalt });
            return parsedResults;
        } catch (error) {
            console.log("\x1b[31mDSQL Database Handler ERROR\x1b[0m =>", database, error.message);
            return null;
        }
    } else if (results) {
        return JSON.parse(JSON.stringify(results));
    } else {
        console.log("\x1b[31mDSQL Database Handler No results returned\x1b[0m =>", results);
        return results;
    }
}

module.exports = dsqlDbHandler;
