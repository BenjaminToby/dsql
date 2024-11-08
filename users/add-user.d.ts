export = addUser;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * Add User to Database
 * ==============================================================================
 * @async
 *
 * @param {object} props - Single object passed
 * @param {string} props.key - FULL ACCESS API Key
 * @param {string} props.database - Database Name
 * @param {import("../package-shared/types").UserDataPayload} props.payload - User Data Payload
 * @param {string} props.encryptionKey
 * @param {string} [props.encryptionSalt]
 *
 * @returns { Promise<import("../package-shared/types").AddUserFunctionReturn> }
 */
declare function addUser({ key, payload, database, encryptionKey, encryptionSalt, }: {
    key: string;
    database: string;
    payload: import("../package-shared/types").UserDataPayload;
    encryptionKey: string;
    encryptionSalt?: string;
}): Promise<import("../package-shared/types").AddUserFunctionReturn>;
