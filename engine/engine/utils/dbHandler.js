/** # MODULE TRACE 
======================================================================
 * Detected 8 files that call this module. The files are listed below:
======================================================================
 * `require` Statement Found in [noDatabaseDbHandler.js](d:\GitHub\dsql\engine\engine\utils\noDatabaseDbHandler.js)
 * `require` Statement Found in [varDatabaseDbHandler.js](d:\GitHub\dsql\engine\engine\utils\varDatabaseDbHandler.js)
 * `require` Statement Found in [addDbEntry.js](d:\GitHub\dsql\engine\query\utils\addDbEntry.js)
 * `require` Statement Found in [deleteDbEntry.js](d:\GitHub\dsql\engine\query\utils\deleteDbEntry.js)
 * `require` Statement Found in [runQuery.js](d:\GitHub\dsql\engine\query\utils\runQuery.js)
 * `require` Statement Found in [updateDbEntry.js](d:\GitHub\dsql\engine\query\utils\updateDbEntry.js)
 * `require` Statement Found in [githubLogin.js](d:\GitHub\dsql\engine\user\social\utils\githubLogin.js)
 * `require` Statement Found in [googleLogin.js](d:\GitHub\dsql\engine\user\social\utils\googleLogin.js)
==== MODULE TRACE END ==== */

// @ts-check

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

const fs = require("fs");
const mysql = require("mysql");
const path = require("path");

const SSL_PATH = path.resolve(__dirname, "../../../ssl");

const connection = mysql.createConnection({
    host: process.env.DSQL_HOST,
    user: process.env.DSQL_USER,
    database: process.env.DSQL_DB_NAME,
    password: process.env.DSQL_PASS,
    charset: "utf8mb4",
    port: process.env.DSQL_PORT?.match(/.../)
        ? parseInt(process.env.DSQL_PORT)
        : undefined,
    timeout: 5000,
    ssl: {
        ca: fs.readFileSync(`${SSL_PATH}/ca-cert.pem`),
    },
    // ssl: {
    //     ca: (() => {
    //         try {
    //             if (process.env.DSQL_SSL_CA_PATH) {
    //                 return fs.readFileSync(process.env.DSQL_SSL_CA_PATH);
    //             }
    //             return undefined;
    //         } catch (error) {
    //             return undefined;
    //         }
    //     })(),
    // },
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * Main DB Handler Function
 * ==============================================================================
 * @async
 * @param {object} params - Single Param object containing params
 * @param {string} params.query - Query String
 * @param {(string | number)[]} [params.values] - Values
 * @param {import("../../../types/database-schema.td").DSQL_DatabaseSchemaType} [params.dbSchema] - Database Schema
 * @param {string} [params.database] - Target Database
 * @param {string} [params.tableName] - Target Table Name
 *
 * @returns {Promise<*>}
 */
module.exports = async function dbHandler({
    query,
    values,
    database,
    dbSchema,
    tableName,
}) {
    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let changeDbError;

    if (database) {
        connection.changeUser({ database: database }, (error) => {
            if (error) {
                console.log(
                    "DB handler error in switching database:",
                    error.message
                );
                changeDbError = error.message;
            }
        });
    }

    if (changeDbError) {
        return { error: changeDbError };
    }

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
        results = await new Promise((resolve, reject) => {
            if (values?.[0]) {
                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.log(
                            "DB handler error with values array:",
                            error.message
                        );
                        console.log("SQL:", error.sql);
                        console.log("State:", error.sqlState, error.sqlMessage);

                        resolve({
                            error: error.message,
                        });
                    } else {
                        resolve(JSON.parse(JSON.stringify(results)));
                    }

                    // setTimeout(() => {
                    //     endConnection(connection);
                    // }, 500);
                });
            } else {
                connection.query(query, (error, results, fields) => {
                    if (error) {
                        console.log("DB handler error:", error.message);
                        console.log("SQL:", error.sql);
                        console.log("State:", error.sqlState, error.sqlMessage);

                        resolve({
                            error: error.message,
                        });
                    } else {
                        resolve(JSON.parse(JSON.stringify(results)));
                    }
                    // setTimeout(() => {
                    //     endConnection(connection);
                    // }, 500);
                });
            }
        });

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log("DB handler error:", error.message);

        results = null;
    }

    /**
     * Return results
     *
     * @description Return results add to cache if "req" param is passed
     */
    // if (results && dbSchema && tableName) {
    //     const tableSchema = dbSchema.tables.find((table) => table.tableName === tableName);
    //     const parsedResults = parseDbResults({
    //         unparsedResults: results,
    //         tableSchema: tableSchema,
    //     });

    //     return parsedResults;
    // } else
    if (results) {
        return results;
    } else {
        console.log("DSQL DB handler no results received for Query =>", query);
        return null;
    }
};
