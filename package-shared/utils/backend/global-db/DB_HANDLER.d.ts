export = DB_HANDLER;
/**
 * DSQL user read-only DB handler
 * @param {object} params
 * @param {string} params.paradigm
 * @param {string} params.database
 * @param {string} params.queryString
 * @param {string[]} [params.queryValues]
 */ declare function DB_HANDLER(...args: any[]): Promise<any>;
