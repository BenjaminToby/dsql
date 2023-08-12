// @ts-check

const hashPassword = require("../../functions/hashPassword");
const addUsersTableToDb = require("../engine/addUsersTableToDb");
const varDatabaseDbHandler = require("../engine/utils/varDatabaseDbHandler");
const addDbEntry = require("../query/utils/addDbEntry");
const runQuery = require("../query/utils/runQuery");

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
 * @param {import("../../users/add-user").UserDataPayload} params.payload - SQL Query
 * @param {import("../../types/database-schema.td").DSQL_DatabaseSchemaType} params.dbSchema - Name of the table to query
 *
 * @returns { Promise<LocalPostReturn> } - Return Object
 */
async function localAddUser({ payload, dbSchema }) {
    try {
        /**
         * Initialize Variables
         */
        const dbFullName = process.env.DSQL_DB_NAME || "";

        const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
        const encryptionSalt = process.env.DSQL_ENCRYPTION_SALT || "";

        /**
         * Hash Password
         *
         * @description Hash Password
         */
        if (!payload?.password) {
            return { success: false, payload: `Password is required to create an account` };
        }

        const hashedPassword = hashPassword(payload.password);
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
                payload: "Could not create users table",
            };
        }

        const fieldsTitles = fields.map((fieldObject) => fieldObject.Field);

        let invalidField = null;

        for (let i = 0; i < Object.keys(payload).length; i++) {
            const key = Object.keys(payload)[i];
            if (!fieldsTitles.includes(key)) {
                invalidField = key;
                break;
            }
        }

        if (invalidField) {
            return { success: false, payload: `${invalidField} is not a valid field!` };
        }

        const existingUser = await varDatabaseDbHandler({
            queryString: `SELECT * FROM users WHERE email = ?${payload.username ? "OR username = ?" : ""}}`,
            queryValuesArray: payload.username ? [payload.email, payload.username] : [payload.email],
            database: dbFullName,
        });

        if (existingUser && existingUser[0]) {
            return {
                success: false,
                payload: "User Already Exists",
            };
        }

        const addUser = await addDbEntry({
            dbContext: "Dsql User",
            paradigm: "Full Access",
            dbFullName: dbFullName,
            tableName: "users",
            data: {
                ...payload,
                image: "/images/user_images/user-preset.png",
                image_thumbnail: "/images/user_images/user-preset-thumbnail.png",
            },
            encryptionKey,
            encryptionSalt,
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
                payload: "Could not create user",
            };
        }

        ////////////////////////////////////////
    } catch (error) {
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

module.exports = localAddUser;
