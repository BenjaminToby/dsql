// @ts-check

const fs = require("fs");
const mysql = require("mysql");
const parseDbResults = require("./parseDbResults");
const dbHandler = require("./dbHandler");

/**
 * DB handler for specific database
 * ==============================================================================
 * @async
 * @param {object} params - Single object params
 * @param {string} params.queryString - SQL string
 * @param {string[]} [params.queryValuesArray] - Values Array
 * @param {string} params.database - Database name
 * @param {import("../../../types/database-schema.td").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @returns {Promise<any[]|null>}
 */
module.exports = async function varDatabaseDbHandler({ queryString, queryValuesArray, database, tableSchema }) {
    /**
     * Create Connection
     *
     * @description Create Connection
     */
    const connection = mysql.createConnection({
        host: process.env.DSQL_SOCKET_HOST,
        user: process.env.DSQL_SOCKET_USER,
        password: process.env.DSQL_SOCKET_PASS || "",
        database: process.env.DSQL_SOCKET_DB_NAME,
        charset: "utf8mb4",
        port: parseInt(process.env.DSQL_SOCKET_DB_NAME || "") || undefined,
    });

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
        if (queryString && queryValuesArray && Array.isArray(queryValuesArray) && queryValuesArray[0]) {
            results = await dbHandler({ query: queryString, values: queryValuesArray, database: database });
        } else {
            results = await dbHandler({ query: queryString, database: database });
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (error) {
        console.log("\x1b[31mvarDatabaseDbHandler ERROR\x1b[0m =>", database, error);
    }

    /**
     * Return results
     *
     * @description Return results add to cache if "req" param is passed
     */
    if (results && tableSchema) {
        try {
            const unparsedResults = results;
            // deepcode ignore reDOS: <please specify a reason of ignoring this>
            const parsedResults = await parseDbResults({ unparsedResults: unparsedResults, tableSchema: tableSchema });
            return parsedResults;
        } catch (error) {
            console.log("\x1b[31mvarDatabaseDbHandler ERROR\x1b[0m =>", database, error);
            return null;
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } else if (results) {
        return results;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } else {
        return null;
    }
};
