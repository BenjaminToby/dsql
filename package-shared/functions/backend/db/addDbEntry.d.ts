export = addDbEntry;
/**
 * Add a db Entry Function
 * ==============================================================================
 * @description Description
 * @async
 *
 * @param {object} params - An object containing the function parameters.
 * @param {("Master" | "Dsql User")} [params.dbContext] - What is the database context? "Master"
 * or "Dsql User". Defaults to "Master"
 * @param {("Read Only" | "Full Access")} [params.paradigm] - What is the paradigm for "Dsql User"?
 * "Read only" or "Full Access"? Defaults to "Read Only"
 * @param {string} [params.dbFullName] - Database full name
 * @param {string} params.tableName - Table name
 * @param {any} params.data - Data to add
 * @param {import("../../../types").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @param {string} [params.duplicateColumnName] - Duplicate column name
 * @param {string} [params.duplicateColumnValue] - Duplicate column value
 * @param {boolean} [params.update] - Update this row if it exists
 * @param {string} [params.encryptionKey] - Update this row if it exists
 * @param {string} [params.encryptionSalt] - Update this row if it exists
 *
 * @returns {Promise<any>}
 */
declare function addDbEntry({ dbContext, paradigm, dbFullName, tableName, data, tableSchema, duplicateColumnName, duplicateColumnValue, update, encryptionKey, encryptionSalt, }: {
    dbContext?: ("Master" | "Dsql User");
    paradigm?: ("Read Only" | "Full Access");
    dbFullName?: string;
    tableName: string;
    data: any;
    tableSchema?: import("../../../types").DSQL_TableSchemaType;
    duplicateColumnName?: string;
    duplicateColumnValue?: string;
    update?: boolean;
    encryptionKey?: string;
    encryptionSalt?: string;
}): Promise<any>;
