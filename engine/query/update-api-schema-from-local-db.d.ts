export = updateApiSchemaFromLocalDb;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * @typedef {Object} PostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - The Y Coordinate
 * @property {string} [error] - The Y Coordinate
 */
/**
 * # Update API Schema From Local DB
 *
 * @async
 *
 * @returns { Promise<PostReturn> } - Return Object
 */
declare function updateApiSchemaFromLocalDb(): Promise<PostReturn>;
declare namespace updateApiSchemaFromLocalDb {
    export { PostReturn };
}
type PostReturn = {
    /**
     * - Did the function run successfully?
     */
    success: boolean;
    /**
     * - The Y Coordinate
     */
    payload?: any;
    /**
     * - The Y Coordinate
     */
    error?: string;
};
