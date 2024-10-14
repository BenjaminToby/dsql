/** # MODULE TRACE 
======================================================================
 * Detected 9 files that call this module. The files are listed below:
======================================================================
 * `require` Statement Found in [createDbFromSchema.js](d:\GitHub\dsql\engine\engine\createDbFromSchema.js)
 * `require` Statement Found in [updateTable.js](d:\GitHub\dsql\engine\engine\utils\updateTable.js)
 * `require` Statement Found in [runQuery.js](d:\GitHub\dsql\engine\query\utils\runQuery.js)
 * `require` Statement Found in [add-user.js](d:\GitHub\dsql\engine\user\add-user.js)
 * `require` Statement Found in [get-user.js](d:\GitHub\dsql\engine\user\get-user.js)
 * `require` Statement Found in [login-user.js](d:\GitHub\dsql\engine\user\login-user.js)
 * `require` Statement Found in [reauth-user.js](d:\GitHub\dsql\engine\user\reauth-user.js)
 * `require` Statement Found in [handleSocialDb.js](d:\GitHub\dsql\engine\user\social\utils\handleSocialDb.js)
 * `require` Statement Found in [update-user.js](d:\GitHub\dsql\engine\user\update-user.js)
==== MODULE TRACE END ==== */

// @ts-check

const fs = require("fs");
const parseDbResults = require("./parseDbResults");
const dbHandler = require("./dbHandler");

/**
 * @typedef {object} VarDbHandlerParam
 * @property {string} queryString - SQL string
 * @property {string[]} [queryValuesArray] - Values Array
 * @property {string} database - Database name
 * @property {import("@/package-shared/types/database-schema.td").DSQL_TableSchemaType} [tableSchema] - Table schema
 */

/**
 * DB handler for specific database
 * ==============================================================================
 * @async
 * @param {VarDbHandlerParam} params
 * @returns {Promise<any>}
 */
module.exports = async function varDatabaseDbHandler({
    queryString,
    queryValuesArray,
    database,
    tableSchema,
}) {
    /**
     * Create Connection
     *
     * @description Create Connection
     */

    const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
    const encryptionSalt = process.env.DSQL_ENCRYPTION_SALT || "";

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     * @type {*}
     */
    let results;

    /**
     * Fetch from db
     *
     * @description Fetch data from db if no cache
     */
    try {
        if (
            queryString &&
            Array.isArray(queryValuesArray) &&
            queryValuesArray[0]
        ) {
            results = await dbHandler({
                query: queryString,
                values: queryValuesArray,
                database: database,
            });
        } else if (queryString && !Array.isArray(queryValuesArray)) {
            results = await dbHandler({
                query: queryString,
                database: database,
            });
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (error) {
        console.log(
            "\x1b[31mvarDatabaseDbHandler ERROR\x1b[0m =>",
            database,
            error
        );
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
            const parsedResults = await parseDbResults({
                unparsedResults: unparsedResults,
                tableSchema: tableSchema,
            });
            return parsedResults;
        } catch (error) {
            console.log(
                "\x1b[31mvarDatabaseDbHandler ERROR\x1b[0m =>",
                database,
                error
            );
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
