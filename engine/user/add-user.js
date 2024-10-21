// @ts-check

const hashPassword = require("../../functions/hashPassword");
const addUsersTableToDb = require("../engine/addUsersTableToDb");
const varDatabaseDbHandler = require("../engine/utils/varDatabaseDbHandler");
const addDbEntry = require("../query/utils/addDbEntry");
const runQuery = require("../query/utils/runQuery");

/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {import("../../package-shared/types").UserDataPayload} params.payload - SQL Query
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} params.dbSchema - Name of the table to query
 * @param {string} [params.encryptionKey]
 * @param {string} [params.encryptionSalt]
 *
 * @returns { Promise<import("../../package-shared/types").AddUserFunctionReturn> } - Return Object
 */
async function localAddUser({
    payload,
    dbSchema,
    encryptionKey,
    encryptionSalt,
}) {
    try {
        /**
         * Initialize Variables
         */
        const dbFullName = process.env.DSQL_DB_NAME || "";

        const encryptionKeyFinal = process.env.DSQL_ENCRYPTION_KEY || "";
        const encryptionSaltFinal = process.env.DSQL_ENCRYPTION_SALT || "";

        /**
         * Hash Password
         *
         * @description Hash Password
         */
        if (!payload?.password) {
            return {
                success: false,
                msg: `Password is required to create an account`,
            };
        }

        const hashedPassword = hashPassword({
            password: payload.password,
            encryptionKey: encryptionKeyFinal,
        });
        payload.password = hashedPassword;

        let fields = await varDatabaseDbHandler({
            queryString: `SHOW COLUMNS FROM users`,
            database: dbFullName,
        });

        if (!fields) {
            const newTable = await addUsersTableToDb({ dbSchema });

            console.log(newTable);

            fields = await varDatabaseDbHandler({
                queryString: `SHOW COLUMNS FROM users`,
                database: dbFullName,
            });
        }

        if (!fields) {
            return {
                success: false,
                msg: "Could not create users table",
            };
        }

        const fieldsTitles = fields.map(
            (/** @type {*} */ fieldObject) => fieldObject.Field
        );

        let invalidField = null;

        for (let i = 0; i < Object.keys(payload).length; i++) {
            const key = Object.keys(payload)[i];
            if (!fieldsTitles.includes(key)) {
                invalidField = key;
                break;
            }
        }

        if (invalidField) {
            return {
                success: false,
                msg: `${invalidField} is not a valid field!`,
            };
        }

        if (!dbSchema) {
            throw new Error("Db Schema not found!");
        }

        const tableSchema = dbSchema.tables.find(
            (tb) => tb?.tableName === "users"
        );

        const existingUser = await varDatabaseDbHandler({
            queryString: `SELECT * FROM users WHERE email = ?${
                payload.username ? "OR username = ?" : ""
            }}`,
            queryValuesArray: payload.username
                ? [payload.email, payload.username]
                : [payload.email],
            database: dbFullName,
            tableSchema: tableSchema,
        });

        if (existingUser && existingUser[0]) {
            return {
                success: false,
                msg: "User Already Exists",
            };
        }

        const addUser = await addDbEntry({
            dbFullName: dbFullName,
            tableName: "users",
            data: {
                ...payload,
                image: "/images/user_images/user-preset.png",
                image_thumbnail:
                    "/images/user_images/user-preset-thumbnail.png",
            },
            encryptionKey: encryptionKeyFinal,
            encryptionSalt: encryptionSaltFinal,
            tableSchema,
        });

        if (addUser?.insertId) {
            const newlyAddedUser = await varDatabaseDbHandler({
                queryString: `SELECT id,first_name,last_name,email,username,phone,image,image_thumbnail,city,state,country,zip_code,address,verification_status,more_user_data FROM users WHERE id='${addUser.insertId}'`,
                database: dbFullName,
            });

            return {
                success: true,
                payload: newlyAddedUser?.[0],
            };
        } else {
            return {
                success: false,
                msg: "Could not create user",
            };
        }

        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        ////////////////////////////////////////
        console.log("Error in local add-user Request =>", error.message);

        return {
            success: false,
            msg: "Something went wrong!",
        };

        ////////////////////////////////////////
    }
}

module.exports = localAddUser;
