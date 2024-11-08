export = updateUser;
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
 * @param {object} params - API Key
 * @param {String} params.key - API Key
 * @param {String} params.database - Target Database
 * @param {{ id: number } & Object.<string, any>} params.payload - User Object: ID is required
 *
 * @returns { Promise<import("../package-shared/types").UpdateUserFunctionReturn>}
 */
declare function updateUser({ key, payload, database }: {
    key: string;
    database: string;
    payload: {
        id: number;
    } & {
        [x: string]: any;
    };
}): Promise<import("../package-shared/types").UpdateUserFunctionReturn>;
