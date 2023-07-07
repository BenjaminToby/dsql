/**
 * Imports: Handle imports
 */

const handler = require("../utils/handler");

/**
 * RAW Query DB Function
 * ==============================================================================
 * @description Description
 *
 * @param {object} params - An object containing the function parameters.
 * @param {string} params.dbFullName - Database full name
 * @param {string?} params.dbHost - Database host
 * @param {string?} params.dbPassword - Database password
 * @param {string?} params.dbUsername - Database username
 * @param {string?} params.query - Query string
 *
 * @returns {object}
 */
module.exports = async function query({ dbFullName, dbHost, dbPassword, dbUsername, query }) {
    /**
     * Initialize variables
     */
    const mysql = require("serverless-mysql")({
        config: {
            host: dbHost,
            user: dbUsername,
            password: dbPassword,
            database: dbFullName.toString().replace(/[^a-z0-9\_\-]/g, ""),
            charset: "utf8mb4",
        },
    });

    let results;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    try {
        /**
         * Run Query
         */
        results = await mysql.query(query);

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
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Return statement
     */
    if (results) {
        return JSON.parse(JSON.stringify(results));
    } else {
        console.log("\x1b[31mDSQL RAW Database Handler No results returned\x1b[0m =>", results);
        return null;
    }
};
