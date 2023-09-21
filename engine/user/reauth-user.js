// @ts-check

const varDatabaseDbHandler = require("../engine/utils/varDatabaseDbHandler");

/**
 *
 * @param {object} param0
 * @param {*} param0.existingUser
 * @param {string[]} [param0.additionalFields]
 * @param {import("../../types/database-schema.td").DSQL_DatabaseSchemaType} [param0.dbSchema]
 * @returns
 */
async function localReauthUser({ existingUser, additionalFields, dbSchema }) {
    try {
        /**
         * Grab data
         *
         * @description Grab data
         */
        const dbFullName = process.env.DSQL_DB_NAME || "";

        /**
         * GRAB user
         *
         * @description GRAB user
         */
        const tableSchema = dbSchema?.tables.find((tb) => tb?.tableName === "users");

        let foundUser =
            existingUser?.id && existingUser.id.toString().match(/./)
                ? await varDatabaseDbHandler({
                      queryString: `SELECT * FROM users WHERE id=?`,
                      queryValuesArray: [existingUser.id],
                      database: dbFullName.replace(/[^a-z0-9_]/g, ""),
                      tableSchema,
                  })
                : null;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        if (!foundUser || !foundUser[0])
            return {
                success: false,
                payload: null,
                msg: "No user found",
            };

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        let csrfKey = Math.random().toString(36).substring(2) + "-" + Math.random().toString(36).substring(2);

        let userPayload = {
            id: foundUser[0].id,
            first_name: foundUser[0].first_name,
            last_name: foundUser[0].last_name,
            username: foundUser[0].username,
            email: foundUser[0].email,
            phone: foundUser[0].phone,
            social_id: foundUser[0].social_id,
            image: foundUser[0].image,
            image_thumbnail: foundUser[0].image_thumbnail,
            verification_status: foundUser[0].verification_status,
            social_login: foundUser[0].social_login,
            social_platform: foundUser[0].social_platform,
            csrf_k: csrfKey,
            more_data: foundUser[0].more_user_data,
            logged_in_status: true,
            date: Date.now(),
        };

        if (additionalFields && Array.isArray(additionalFields) && additionalFields.length > 0) {
            additionalFields.forEach((key) => {
                // @ts-ignore
                userPayload[key] = foundUser?.[0][key];
            });
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /** ********************* Send Response */
        return {
            success: true,
            msg: "Login Successful",
            payload: userPayload,
            userId: "0",
        };

        ////////////////////////////////////////

        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log("Error in local login-user Request =>", error.message);
        return {
            success: false,
            msg: "Login Failed",
        };
    }
}

module.exports = localReauthUser;
