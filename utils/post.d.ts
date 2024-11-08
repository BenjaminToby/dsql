export = post;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Make a post request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {string} [params.key] - FULL ACCESS API Key
 * @param {string} [params.database] - Database Name
 * @param {import("../package-shared/types").PostDataPayload | string} params.query - SQL query String or Request Object
 * @param {any[]} [params.queryValues] - Query Values if using "?" placeholders
 * @param {string} [params.tableName] - Name of the table to query
 *
 * @returns { Promise<import("../package-shared/types").PostReturn> } - Return Object
 */
declare function post({ key, query, queryValues, database, tableName }: {
    key?: string;
    database?: string;
    query: import("../package-shared/types").PostDataPayload | string;
    queryValues?: any[];
    tableName?: string;
}): Promise<import("../package-shared/types").PostReturn>;
