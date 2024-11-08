export = getUser;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {object} params - Single Param object containing params
 * @param {String} params.key - API Key
 * @param {String} params.database - Target Database
 * @param {number} params.userId - user id
 * @param {string[]} [params.fields] - fields to select
 *
 * @returns { Promise<import("../types/user.td").GetUserFunctionReturn>}
 */
declare function getUser({ key, userId, database, fields }: {
    key: string;
    database: string;
    userId: number;
    fields?: string[];
}): Promise<any>;
