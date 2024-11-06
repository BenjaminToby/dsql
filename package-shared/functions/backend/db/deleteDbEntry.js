// @ts-check

const DB_HANDLER = require("../../../utils/backend/global-db/DB_HANDLER");
const DSQL_USER_DB_HANDLER = require("../../../utils/backend/global-db/DSQL_USER_DB_HANDLER");

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
 * @param {import("../../../types").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @param {string} params.identifierColumnName - Update row identifier column name
 * @param {string|number} params.identifierValue - Update row identifier column value
 *
 * @returns {Promise<object|null>}
 */
async function deleteDbEntry({
    dbContext,
    paradigm,
    dbFullName,
    tableName,
    identifierColumnName,
    identifierValue,
}) {
    try {
        /**
         * Check if data is valid
         */
        const isMaster = dbContext?.match(/dsql.user/i)
            ? false
            : dbFullName && !dbFullName.match(/^datasquirel$/)
            ? false
            : true;

        /** @type { (a1:any, a2?:any) => any } */
        const dbHandler = isMaster ? DB_HANDLER : DSQL_USER_DB_HANDLER;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * Execution
         *
         * @description
         */
        const query = `DELETE FROM ${tableName} WHERE \`${identifierColumnName}\`=?`;

        const deletedEntry = isMaster
            ? await dbHandler(query, [identifierValue])
            : await dbHandler({
                  paradigm,
                  queryString: query,
                  database: dbFullName,
                  queryValues: [identifierValue],
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
