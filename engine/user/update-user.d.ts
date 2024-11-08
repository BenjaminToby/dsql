export = localUpdateUser;
/**
 * @typedef {Object} LocalPostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - GET request results
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 */
/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {*} params.payload - SQL Query
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} params.dbSchema - Name of the table to query
 *
 * @returns { Promise<LocalPostReturn> } - Return Object
 */
declare function localUpdateUser({ payload, dbSchema }: {
    payload: any;
    dbSchema: import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined;
}): Promise<LocalPostReturn>;
declare namespace localUpdateUser {
    export { LocalPostReturn };
}
type LocalPostReturn = {
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
