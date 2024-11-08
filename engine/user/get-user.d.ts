export = getLocalUser;
/**
 *
 * @param {object} param0
 * @param {number} param0.userId
 * @param {string[]} param0.fields
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} [param0.dbSchema]
 * @returns
 */
declare function getLocalUser({ userId, fields, dbSchema }: {
    userId: number;
    fields: string[];
    dbSchema?: import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined;
}): Promise<{
    success: boolean;
    payload: any;
    msg: string;
} | {
    success: boolean;
    payload: any;
    msg?: undefined;
}>;
