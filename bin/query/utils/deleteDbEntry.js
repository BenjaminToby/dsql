// @ts-check

const dbHandler = require("../../engine/utils/dbHandler");

/**
 * Imports: Handle imports
 */

/**
 * Delete DB Entry Function
 * ==============================================================================
 * @description Description
 * @async
 *
 * @param {object} params - An object containing the function parameters.
 * @param {string} [params.dbContext] - What is the database context? "Master"
 * or "Dsql User". Defaults to "Master"
 * @param {("Read Only" | "Full Access")} [params.paradigm] - What is the paradigm for "Dsql User"?
 * "Read only" or "Full Access"? Defaults to "Read Only"
 * @param {string} params.dbFullName - Database full name
 * @param {string} params.tableName - Table name
 * @param {import("../../../types/database-schema.td").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @param {string} params.identifierColumnName - Update row identifier column name
 * @param {string|number} params.identifierValue - Update row identifier column value
 *
 * @returns {Promise<object|null>}
 */
async function deleteDbEntry({ dbContext, paradigm, dbFullName, tableName, identifierColumnName, identifierValue }) {
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

        const deletedEntry = await dbHandler({
            query: query,
            database: dbFullName,
            values: [identifierValue],
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
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

module.exports = deleteDbEntry;
