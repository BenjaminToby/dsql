// @ts-check

const hashPassword = require("../../functions/hashPassword");
const varDatabaseDbHandler = require("../engine/utils/varDatabaseDbHandler");

/**
 *
 * @param {object} param0
 * @param {string} param0.email
 * @param {import("../../types/database-schema.td").DSQL_DatabaseSchemaType} [param0.dbSchema]
 * @param {string} param0.email_login_field
 * @returns
 */
async function localSendEmailCode({ email, dbSchema, email_login_field }) {
    try {
        /**
         * User auth
         *
         * @description Authenticate user
         */
        const dbFullName = process.env.DSQL_DB_NAME || "";
        const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
        const encryptionSalt = process.env.DSQL_ENCRYPTION_SALT || "";

        /**
         * Check input validity
         *
         * @description Check input validity
         */
        if (email?.match(/ /)) {
            return {
                success: false,
                msg: "Invalid Email/Password format",
            };
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        const tableSchema = dbSchema?.tables.find(
            (tb) => tb?.tableName === "users"
        );

        let foundUser = await varDatabaseDbHandler({
            queryString: `SELECT * FROM users WHERE email = ?`,
            queryValuesArray: [email],
            database: dbFullName.replace(/[^a-z0-9_]/g, ""),
            tableSchema,
        });

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        if (!foundUser || !foundUser[0])
            return {
                success: false,
                payload: null,
                msg: "No user found",
            };

        function generateCode() {
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let code = "";
            for (let i = 0; i < 8; i++) {
                code += chars[Math.floor(Math.random() * chars.length)];
            }
            return code;
        }

        if (foundUser && foundUser[0] && email_login_field) {
            const tempCode = generateCode();
            let setTempCode = await varDatabaseDbHandler({
                queryString: `UPDATE users SET ${email_login_field} = ? WHERE email = ?`,
                queryValuesArray: [tempCode, email],
                database: dbFullName.replace(/[^a-z0-9_]/g, ""),
                tableSchema,
            });
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /** ********************* Send Response */
        return {
            success: true,
            msg: "Success",
        };

        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log("Error in local login-user Request =>", error.message);
        return {
            success: false,
            msg: "Failed: " + error.message,
        };
    }
}

module.exports = localSendEmailCode;
