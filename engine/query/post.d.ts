export = localPost;
/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {import("../../package-shared/types").LocalPostQueryObject} params.options
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} [params.dbSchema]
 *
 * @returns { Promise<import("../../package-shared/types").LocalPostReturn> }
 */
declare function localPost({ options, dbSchema }: {
    options: import("../../package-shared/types").LocalPostQueryObject;
    dbSchema?: import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined;
}): Promise<import("../../package-shared/types").LocalPostReturn>;
