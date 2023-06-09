/**
 * Imports: Handle imports
 */

/**
 * RAW Query DB Function
 * ==============================================================================
 * @description Description
 * @async
 *
 * @param {object} params - An object containing the function parameters.
 * @param {string} params.dbFullName - Database full name
 * @param {string?} params.dbHost - Database host
 * @param {string?} params.dbPassword - Database password
 * @param {string?} params.dbUsername - Database username
 * @param {string?} params.query - Query string
 * @param {string[]?} params.valuesArray - Values array
 *
 * @returns {Promise<object|null>}
 */
async function query({ dbFullName, dbHost, dbPassword, dbUsername, query, valuesArray }) {
    /**
     * Initialize mysql
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
        if (valuesArray && Array.isArray(valuesArray) && valuesArray[0]) {
            results = await mysql.query(query, valuesArray);
        } else {
            results = await mysql.query(query);
        }

        /**
         * Clean up
         */
        await mysql.end();
    } catch (error) {
        /**
         * Handle error and clean up
         */
        console.log("\x1b[31mDSQL Database Handler ERROR\x1b[0m =>", dbFullName, error.message);

        /**
         * Clean up
         */
        await mysql.end();

        /**
         * Return error
         */
        return error.message;
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
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

module.exports = query;
