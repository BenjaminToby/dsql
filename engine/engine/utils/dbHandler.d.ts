declare function _exports({ query, values, database, dbSchema, tableName, }: {
    query: string;
    values?: (string | number)[];
    dbSchema?: import("../../../package-shared/types").DSQL_DatabaseSchemaType;
    database?: string;
    tableName?: string;
}): Promise<any>;
export = _exports;
