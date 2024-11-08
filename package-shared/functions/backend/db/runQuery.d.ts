export = runQuery;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Run DSQL users queries
 * ==============================================================================
 * @param {object} params - An object containing the function parameters.
 * @param {string} params.dbFullName - Database full name. Eg. "datasquire_user_2_test"
 * @param {string | any} params.query - Query string or object
 * @param {boolean} [params.readOnly] - Is this operation read only?
 * @param {boolean} [params.local] - Is this operation read only?
 * @param {import("../../../types").DSQL_DatabaseSchemaType} [params.dbSchema] - Database schema
 * @param {string[]} [params.queryValuesArray] - An optional array of query values if "?" is used in the query string
 * @param {string} [params.tableName] - Table Name
 *
 * @return {Promise<any>}
 */
declare function runQuery({ dbFullName, query, readOnly, dbSchema, queryValuesArray, tableName, local, }: {
    dbFullName: string;
    query: string | any;
    readOnly?: boolean;
    local?: boolean;
    dbSchema?: import("../../../types").DSQL_DatabaseSchemaType;
    queryValuesArray?: string[];
    tableName?: string;
}): Promise<any>;
