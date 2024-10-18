// @ts-check

const varDatabaseDbHandler = require("../engine/utils/varDatabaseDbHandler");

/**
 *
 * @param {object} param0
 * @param {number} param0.userId
 * @param {string[]} param0.fields
 * @param {DSQL_DatabaseSchemaType | undefined} [param0.dbSchema]
 * @returns
 */
async function getLocalUser({ userId, fields, dbSchema }) {
    /**
     * GRAB user
     *
     * @description GRAB user
     */
    const sanitizedFields = fields.map((fld) => fld.replace(/[^a-z\_]/g, ""));
    const query = `SELECT ${sanitizedFields.join(",")} FROM users WHERE id = ?`;

    const tableSchema = dbSchema?.tables.find(
        (tb) => tb?.tableName === "users"
    );

    let foundUser = await varDatabaseDbHandler({
        queryString: query,
        queryValuesArray: [userId.toString()],
        database: process.env.DSQL_DB_NAME || "",
        tableSchema,
    });

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    if (!foundUser || !foundUser[0])
        return {
            success: false,
            payload: null,
            msg: "User not found!",
        };

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /** ********************* Send Response */
    return {
        success: true,
        payload: foundUser[0],
    };
}

module.exports = getLocalUser;
