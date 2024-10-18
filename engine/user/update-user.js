// @ts-check

const updateDbEntry = require("../query/utils/updateDbEntry");

/**
 * @typedef {Object} LocalPostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - GET request results
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 */

/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {*} params.payload - SQL Query
 * @param {DSQL_DatabaseSchemaType | undefined} params.dbSchema - Name of the table to query
 *
 * @returns { Promise<LocalPostReturn> } - Return Object
 */
async function localUpdateUser({ payload, dbSchema }) {
    try {
        /**
         * User auth
         *
         * @description Authenticate user
         */
        /**
         * Initialize Variables
         */
        const dbFullName = process.env.DSQL_DB_NAME || "";

        const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
        const encryptionSalt = process.env.DSQL_ENCRYPTION_SALT || "";

        const data = (() => {
            const reqBodyKeys = Object.keys(payload);
            const finalData = {};

            reqBodyKeys.forEach((key) => {
                if (key?.match(/^date_|^id$/)) return;
                // @ts-ignore
                finalData[key] = payload[key];
            });

            return finalData;
        })();

        if (!dbSchema) {
            throw new Error("Db Schema not found!");
        }

        const tableSchema = dbSchema.tables.find(
            (tb) => tb?.tableName === "users"
        );

        const updateUser = await updateDbEntry({
            dbContext: "Dsql User",
            paradigm: "Full Access",
            dbFullName: dbFullName,
            tableName: "users",
            identifierColumnName: "id",
            identifierValue: payload.id,
            data: data,
            encryptionKey,
            encryptionSalt,
            tableSchema,
        });

        return {
            success: true,
            payload: updateUser,
        };
    } catch (/** @type {*} */ error) {
        ////////////////////////////////////////
        console.log("Error in local add-user Request =>", error.message);

        return {
            success: false,
            payload: null,
            msg: "Something went wrong!",
        };

        ////////////////////////////////////////
    }
}

module.exports = localUpdateUser;
