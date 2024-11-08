export = getSchema;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * @typedef {Object} GetSchemaReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../package-shared/types").DSQL_DatabaseSchemaType | import("../package-shared/types").DSQL_TableSchemaType | import("../package-shared/types").DSQL_FieldSchemaType | null} payload - Response payload
 */
/**
 * # Get Schema for Database, table, or field *
 * @param {import("../package-shared/types").GetSchemaAPIParam} params
 *
 * @returns { Promise<GetSchemaReturn> } - Return Object
 */
declare function getSchema({ key, database, field, table }: import("../package-shared/types").GetSchemaAPIParam): Promise<GetSchemaReturn>;
declare namespace getSchema {
    export { GetSchemaReturn };
}
type GetSchemaReturn = {
    /**
     * - Did the function run successfully?
     */
    success: boolean;
    /**
     * - Response payload
     */
    payload: import("../package-shared/types").DSQL_DatabaseSchemaType | import("../package-shared/types").DSQL_TableSchemaType | import("../package-shared/types").DSQL_FieldSchemaType | null;
};
