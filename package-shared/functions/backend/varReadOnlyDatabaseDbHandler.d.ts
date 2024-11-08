declare function _exports({ queryString, database, queryValuesArray, tableSchema, }: {
    queryString: string;
    database: string;
    queryValuesArray?: string[];
    tableSchema?: import("../../types").DSQL_TableSchemaType;
}): Promise<any>;
export = _exports;
