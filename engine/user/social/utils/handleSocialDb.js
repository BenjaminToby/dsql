// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const fs = require("fs");
const http = require("http");
const varDatabaseDbHandler = require("../../../engine/utils/varDatabaseDbHandler");
const encrypt = require("../../../../functions/encrypt");
const addDbEntry = require("../../../../package-shared/functions/backend/db/addDbEntry");

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {object} FunctionReturn
 * @property {boolean} success - Did the operation complete successfully or not?
 * @property {{
 *  id: number,
 *  first_name: string,
 *  last_name: string,
 * }|null} user - User payload object: or "null"
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 * @property {string | number} [social_id] - Social Id
 * @property {string} [social_platform] - Social Platform
 * @property {object} [payload] - Payload
 * @property {boolean} [alert] - Alert
 * @property {*} [newUser] - New User
 */

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

const database = process.env.DSQL_DB_NAME || "";
const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
const encryptionSalt = process.env.DSQL_ENCRYPTION_SALT || "";

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

/**
 * Handle Social User Auth on Datasquirel Database
 * ==============================================================================
 *
 * @description This function handles all social login logic after the social user
 * has been authenticated and userpayload is present. The payload MUST contain the
 * specified fields because this funciton will create a new user if the authenticated
 * user does not exist.
 *
 * @param {{
 *  database: string|null|undefined,
 *  social_id: string|number,
 *  email: string,
 *  social_platform: string,
 *  payload: {
 *      social_id: string | number,
 *      email: string,
 *      social_platform: string,
 *      first_name: string,
 *      last_name: string,
 *      image: string,
 *      image_thumbnail: string,
 *      username: string,
 *  },
 *  res: http.ServerResponse,
 *  supEmail?: string | null,
 *  additionalFields?: object,
 * dbSchema: import("../../../../package-shared/types").DSQL_DatabaseSchemaType | undefined
 * }} params - function parameters inside an object
 *
 * @returns {Promise<FunctionReturn>} - Response object
 */
async function handleSocialDb({
    social_id,
    email,
    social_platform,
    payload,
    res,
    supEmail,
    additionalFields,
    dbSchema,
}) {
    const tableSchema = dbSchema?.tables.find(
        (tb) => tb?.tableName === "users"
    );

    try {
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        let existingSocialIdUser = await varDatabaseDbHandler({
            database: database ? database : "datasquirel",
            queryString: `SELECT * FROM users WHERE social_id = ? AND social_login='1' AND social_platform = ? `,
            queryValuesArray: [social_id.toString(), social_platform],
        });

        if (existingSocialIdUser && existingSocialIdUser[0]) {
            return await loginSocialUser({
                user: existingSocialIdUser[0],
                social_platform,
                res,
                database,
                additionalFields,
            });
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        const finalEmail = email ? email : supEmail ? supEmail : null;

        if (!finalEmail) {
            return {
                success: false,
                user: null,
                msg: "No Email Present",
                social_id,
                social_platform,
                payload,
            };
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        let existingEmailOnly = await varDatabaseDbHandler({
            database: database ? database : "datasquirel",
            queryString: `SELECT * FROM users WHERE email = ?`,
            queryValuesArray: [finalEmail],
            tableSchema,
        });

        if (existingEmailOnly && existingEmailOnly[0]) {
            return {
                success: false,
                user: null,
                msg: "This Email is already taken",
                alert: true,
            };
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        const foundUser = await varDatabaseDbHandler({
            database: database ? database : "datasquirel",
            queryString: `SELECT * FROM users WHERE email='${finalEmail}' AND social_login='1' AND social_platform='${social_platform}' AND social_id='${social_id}'`,
        });

        if (foundUser && foundUser[0]) {
            return await loginSocialUser({
                user: payload,
                social_platform,
                res,
                database,
                additionalFields,
            });
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        const socialHashedPassword = encrypt({
            data: social_id.toString(),
            encryptionKey,
            encryptionSalt,
        });

        const data = {
            social_login: "1",
            verification_status: supEmail ? "0" : "1",
            password: socialHashedPassword,
        };

        Object.keys(payload).forEach((key) => {
            // @ts-ignore
            data[key] = payload[key];
        });

        const newUser = await addDbEntry({
            dbFullName: database ? database : "datasquirel",
            tableName: "users",
            duplicateColumnName: "email",
            duplicateColumnValue: finalEmail,
            data: {
                ...data,
                email: finalEmail,
            },
            encryptionKey,
            encryptionSalt,
            tableSchema,
        });

        if (newUser?.insertId) {
            const newUserQueried = await varDatabaseDbHandler({
                database: database ? database : "datasquirel",
                queryString: `SELECT * FROM users WHERE id='${newUser.insertId}'`,
            });

            if (!newUserQueried || !newUserQueried[0])
                return {
                    success: false,
                    user: null,
                    msg: "User Insertion Failed!",
                };

            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////

            if (supEmail && database?.match(/^datasquirel$/)) {
                /**
                 * Send email Verification
                 *
                 * @description Send verification email to newly created agent
                 */
                let generatedToken = encrypt({
                    data: JSON.stringify({
                        id: newUser.insertId,
                        email: supEmail,
                        dateCode: Date.now(),
                    }),
                    encryptionKey,
                    encryptionSalt,
                });
            }

            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////

            return await loginSocialUser({
                user: newUserQueried[0],
                social_platform,
                res,
                database,
                additionalFields,
            });

            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
        } else {
            console.log(
                "Social User Failed to insert in 'handleSocialDb.js' backend function =>",
                newUser
            );

            return {
                success: false,
                user: null,
                msg: "Social User Failed to insert in 'handleSocialDb.js' backend function => ",
                newUser: newUser,
            };
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log(
            "ERROR in 'handleSocialDb.js' backend function =>",
            error.message
        );

        return {
            success: false,
            user: null,
            error: error.message,
        };

        // serverError({
        //     component: "/functions/backend/social-login/handleSocialDb.js - main-catch-error",
        //     message: error.message,
        //     user: { first_name, last_name },
        // });
    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * Function to login social user
 * ==============================================================================
 * @description This function logs in the user after 'handleSocialDb' function finishes
 * the user creation or confirmation process
 *
 * @async
 *
 * @param {object} params - function parameters inside an object
 * @param {{
 *  first_name: string,
 *  last_name: string,
 *  email: string,
 *  social_id: string|number,
 * }} params.user - user object
 * @param {string} params.social_platform - Whether its "google" or "facebook" or "github"
 * @param {http.ServerResponse} params.res - Https response object
 * @param {string|null} params.database - Target Database
 * @param {object} [params.additionalFields] - Additional fields to be added to the user payload
 *
 * @returns {Promise<{
 *  success: boolean,
 *  user: { id: number, first_name: string, last_name: string } | null
 *  msg?: string
 * }>}
 */
async function loginSocialUser({
    user,
    social_platform,
    res,
    database,
    additionalFields,
}) {
    const foundUser = await varDatabaseDbHandler({
        database: database ? database : "datasquirel",
        queryString: `SELECT * FROM users WHERE email='${user.email}' AND social_id='${user.social_id}' AND social_platform='${social_platform}'`,
    });

    let csrfKey =
        Math.random().toString(36).substring(2) +
        "-" +
        Math.random().toString(36).substring(2);

    if (!foundUser?.[0]) {
        return {
            success: false,
            user: null,
            msg: "User Not Found",
        };
    }

    let userPayload = {
        id: foundUser[0].id,
        type: foundUser[0].type || "",
        stripe_id: foundUser[0].stripe_id || "",
        first_name: foundUser[0].first_name,
        last_name: foundUser[0].last_name,
        username: foundUser[0].username,
        email: foundUser[0].email,
        social_id: foundUser[0].social_id,
        image: foundUser[0].image,
        image_thumbnail: foundUser[0].image_thumbnail,
        verification_status: foundUser[0].verification_status,
        social_login: foundUser[0].social_login,
        social_platform: foundUser[0].social_platform,
        csrf_k: csrfKey,
        logged_in_status: true,
        date: Date.now(),
    };

    if (additionalFields && Object.keys(additionalFields).length > 0) {
        Object.keys(additionalFields).forEach((key) => {
            // @ts-ignore
            userPayload[key] = foundUser[0][key];
        });
    }

    let encryptedPayload = encrypt({
        data: JSON.stringify(userPayload),
        encryptionKey,
        encryptionSalt,
    });

    if (res?.setHeader) {
        res.setHeader("Set-Cookie", [
            `datasquirelAuthKey=${encryptedPayload};samesite=strict;path=/;HttpOnly=true;Secure=true`,
            `csrf=${csrfKey};samesite=strict;path=/;HttpOnly=true`,
        ]);
    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    return {
        success: true,
        user: userPayload,
    };
}

module.exports = handleSocialDb;
