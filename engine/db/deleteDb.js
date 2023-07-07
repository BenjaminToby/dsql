/**
 * Imports: Handle imports
 */
const handler = require("../utils/handler");

/**
 * Delete DB Entry Function
 * ==============================================================================
 * @description Description
 * @async
 *
 * @param {object} params - An object containing the function parameters.
 * @param {string} params.dbFullName - Database full name
 * @param {string} params.tableName - Table name
 * @param {DSQL_TableSchemaType?} params.tableSchema - Table schema
 * @param {string} params.identifierColumnName - Update row identifier column name
 * @param {string|number} params.identifierValue - Update row identifier column value
 * @param {boolean?} params.update - Update this row if it exists
 * @param {string?} params.dbHost - Database host
 * @param {string?} params.dbPassword - Database password
 * @param {string?} params.dbUsername - Database username
 * @param {string?} params.encryptionKey - Encryption key
 * @param {string?} params.encryptionSalt - Encryption salt
 *
 * @returns {Promise<object|null>}
 */
module.exports = async function deleteDb({ dbFullName, tableName, tableSchema, identifierColumnName, identifierValue, dbHost, dbPassword, dbUsername, encryptionKey, encryptionSalt }) {
    try {
        /**
         * Check if data is valid
         */

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * Execution
         *
         * @description
         */
        const query = `DELETE FROM ${tableName} WHERE \`${identifierColumnName}\`=?`;

        const deletedEntry = await handler({
            queryString: query,
            database: dbFullName,
            queryValuesArray: [identifierValue],
            dbHost,
            dbPassword,
            dbUsername,
            encryptionKey,
            encryptionSalt,
            tableSchema,
        });

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * Return statement
         */
        return deletedEntry;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (error) {
        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        return null;
    }
};
