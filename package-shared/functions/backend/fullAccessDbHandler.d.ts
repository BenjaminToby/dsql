declare function _exports({ queryString, database, tableSchema, queryValuesArray, local, }: {
    queryString: string;
    database: string;
    local?: boolean;
    tableSchema?: import("../../types").DSQL_TableSchemaType | null;
    queryValuesArray?: string[];
}): Promise<any>;
export = _exports;
