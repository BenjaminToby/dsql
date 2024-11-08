declare namespace _exports {
    export { VarDbHandlerParam };
}
declare function _exports({ queryString, queryValuesArray, database, tableSchema, }: VarDbHandlerParam): Promise<any>;
export = _exports;
type VarDbHandlerParam = {
    /**
     * - SQL string
     */
    queryString: string;
    /**
     * - Values Array
     */
    queryValuesArray?: string[];
    /**
     * - Database name
     */
    database: string;
    /**
     * - Table schema
     */
    tableSchema?: import("../../../package-shared/types").DSQL_TableSchemaType;
};
