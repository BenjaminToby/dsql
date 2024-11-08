export = deleteDbEntry;
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
declare function deleteDbEntry({ dbContext, paradigm, dbFullName, tableName, identifierColumnName, identifierValue, }: {
    dbContext?: string;
    paradigm?: ("Read Only" | "Full Access");
    dbFullName: string;
    tableName: string;
    tableSchema?: import("../../../types").DSQL_TableSchemaType;
    identifierColumnName: string;
    identifierValue: string | number;
}): Promise<object | null>;
