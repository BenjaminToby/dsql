// @ts-check

const hashPassword = require("../../functions/hashPassword");
const varDatabaseDbHandler = require("../engine/utils/varDatabaseDbHandler");

/**
 *
 * @param {import("../../package-shared/types").PackageUserLoginLocalBody} param0
 * @returns
 */
async function loginLocalUser({
    payload,
    additionalFields,
    dbSchema,
    email_login,
    email_login_code,
    email_login_field,
}) {
    try {
        /**
         * User auth
         *
         * @description Authenticate user
         */

        const email = payload.email;
        const username = payload.username;
        const password = payload.password;

        const dbFullName = process.env.DSQL_DB_NAME || "";
        const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
        const encryptionSalt = process.env.DSQL_ENCRYPTION_SALT || "";

        /**
         * Check input validity
         *
         * @description Check input validity
         */
        if (
            email?.match(/ /) ||
            (username && username?.match(/ /)) ||
            (password && password?.match(/ /))
        ) {
            return {
                success: false,
                msg: "Invalid Email/Password format",
            };
        }

        /**
         * Password hash
         *
         * @description Password hash
         */
        let hashedPassword = password
            ? hashPassword({
                  password: password,
                  encryptionKey: encryptionKey,
              })
            : null;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        const tableSchema = dbSchema?.tables.find(
            (tb) => tb?.tableName === "users"
        );

        let foundUser = await varDatabaseDbHandler({
            queryString: `SELECT * FROM users WHERE email = ? OR username = ?`,
            queryValuesArray: [email || "", username || ""],
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

        let isPasswordCorrect = false;

        if (foundUser && foundUser[0] && !email_login) {
            isPasswordCorrect = hashedPassword === foundUser[0].password;
        } else if (
            foundUser &&
            foundUser[0] &&
            email_login &&
            email_login_code &&
            email_login_field
        ) {
            const tempCode = foundUser[0][email_login_field];

            if (!tempCode) throw new Error("No code Found!");

            const tempCodeArray = tempCode.split("-");
            const [code, codeDate] = tempCodeArray;
            const millisecond15mins = 1000 * 60 * 15;

            if (Date.now() - Number(codeDate) > millisecond15mins) {
                throw new Error("Code Expired");
            }
            isPasswordCorrect = code === email_login_code;
        }

        let socialUserValid = false;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        if (!isPasswordCorrect && !socialUserValid) {
            return {
                success: false,
                msg: "Wrong password, no social login validity",
                payload: null,
            };
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        let csrfKey =
            Math.random().toString(36).substring(2) +
            "-" +
            Math.random().toString(36).substring(2);

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

        if (
            additionalFields &&
            Array.isArray(additionalFields) &&
            additionalFields.length > 0
        ) {
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
    } catch (/** @type {*} */ error) {
        console.log("Error in local login-user Request =>", error.message);
        return {
            success: false,
            msg: "Login Failed",
        };
    }
}

module.exports = loginLocalUser;
