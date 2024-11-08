export = localAddUser;
/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {import("../../package-shared/types").UserDataPayload} params.payload - SQL Query
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} params.dbSchema - Name of the table to query
 * @param {string} [params.encryptionKey]
 * @param {string} [params.encryptionSalt]
 *
 * @returns { Promise<import("../../package-shared/types").AddUserFunctionReturn> } - Return Object
 */
declare function localAddUser({ payload, dbSchema, encryptionKey, encryptionSalt, }: {
    payload: import("../../package-shared/types").UserDataPayload;
    dbSchema: import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined;
    encryptionKey?: string;
    encryptionSalt?: string;
}): Promise<import("../../package-shared/types").AddUserFunctionReturn>;
