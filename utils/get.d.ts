export = get;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {string} [params.key] - API Key
 * @param {string} [params.db] - Database Name
 * @param {string} params.query - SQL Query
 * @param {string[]} [params.queryValues] - An array of query values if using "?" placeholders
 * @param {string} [params.tableName] - Name of the table to query
 *
 * @returns { Promise<import("../package-shared/types").GetReturn> } - Return Object
 */
declare function get({ key, db, query, queryValues, tableName }: {
    key?: string;
    db?: string;
    query: string;
    queryValues?: string[];
    tableName?: string;
}): Promise<import("../package-shared/types").GetReturn>;
