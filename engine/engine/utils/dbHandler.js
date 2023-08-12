// @ts-check

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

const fs = require("fs");
const mysql = require("mysql");
const endConnection = require("./endConnection");

const connection = mysql.createConnection({
    host: process.env.DSQL_HOST,
    user: process.env.DSQL_USER,
    database: process.env.DSQL_DB_NAME,
    password: process.env.DSQL_PASS,
    charset: "utf8mb4",
    port: process.env.DSQL_PORT?.match(/.../) ? parseInt(process.env.DSQL_PORT) : undefined,
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
 * @param {object} [params.dbSchema] - Database Schema
 * @param {string} [params.database] - Target Database
 *
 * @returns {Promise<object | null>}
 */
module.exports = async function dbHandler({ query, values, database }) {
    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let changeDbError;

    if (database) {
        connection.changeUser({ database: database }, (error) => {
            if (error) {
                console.log("DB handler error in switching database:", error.message);
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
            if (connection.state !== "disconnected") {
                if (values) {
                    connection.query(query, values, (error, results, fields) => {
                        if (error) {
                            console.log("DB handler error:", error.message);
                            resolve({
                                error: error.message,
                            });
                        } else {
                            resolve(JSON.parse(JSON.stringify(results)));
                        }
                        setTimeout(() => {
                            endConnection(connection);
                        }, 500);
                    });
                } else {
                    connection.query(query, (error, results, fields) => {
                        if (error) {
                            console.log("DB handler error:", error.message);
                            resolve({
                                error: error.message,
                            });
                        } else {
                            resolve(JSON.parse(JSON.stringify(results)));
                        }
                        setTimeout(() => {
                            endConnection(connection);
                        }, 500);
                    });
                }
            }
        });

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (error) {
        console.log("DB handler error:", error.message);

        results = null;
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
