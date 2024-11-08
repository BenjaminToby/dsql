export = DSQL_USER_DB_HANDLER;
/**
 * DSQL user read-only DB handler
 * @param {object} params
 * @param {"Full Access" | "FA" | "Read Only"} params.paradigm
 * @param {string} params.database
 * @param {string} params.queryString
 * @param {string[]} [params.queryValues]
 */
declare function DSQL_USER_DB_HANDLER({ paradigm, database, queryString, queryValues, }: {
    paradigm: "Full Access" | "FA" | "Read Only";
    database: string;
    queryString: string;
    queryValues?: string[];
}): Promise<any> | {
    success: boolean;
    error: any;
};
