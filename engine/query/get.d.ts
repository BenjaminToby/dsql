export = localGet;
/**
 * @typedef {Object} LocalGetReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - GET request results
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 */
/**
 * @typedef {Object} LocalQueryObject
 * @property {string} query - Table Name
 * @property {string} [tableName] - Table Name
 * @property {string[]} [queryValues] - GET request results
 */
/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {LocalQueryObject} params.options - SQL Query
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} [params.dbSchema] - Name of the table to query
 *
 * @returns { Promise<LocalGetReturn> } - Return Object
 */
declare function localGet({ options, dbSchema }: {
    options: LocalQueryObject;
    dbSchema?: import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined;
}): Promise<LocalGetReturn>;
declare namespace localGet {
    export { LocalGetReturn, LocalQueryObject };
}
type LocalGetReturn = {
    /**
     * - Did the function run successfully?
     */
    success: boolean;
    /**
     * - GET request results
     */
    payload?: any;
    /**
     * - Message
     */
    msg?: string;
    /**
     * - Error Message
     */
    error?: string;
};
type LocalQueryObject = {
    /**
     * - Table Name
     */
    query: string;
    /**
     * - Table Name
     */
    tableName?: string;
    /**
     * - GET request results
     */
    queryValues?: string[];
};
