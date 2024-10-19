// @ts-check

const hashPassword = require("../../functions/hashPassword");
const varDatabaseDbHandler = require("../engine/utils/varDatabaseDbHandler");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param {object} param0
 * @param {string} param0.email
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} [param0.dbSchema]
 * @param {string} param0.email_login_field
 * @param {string} [param0.mail_domain]
 * @param {string} [param0.mail_username]
 * @param {string} [param0.mail_password]
 * @param {number} [param0.mail_port]
 * @param {string} [param0.sender]
 * @returns
 */
async function localSendEmailCode({
    email,
    dbSchema,
    email_login_field,
    mail_domain,
    mail_username,
    mail_password,
    mail_port,
    sender,
}) {
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

            let transporter = nodemailer.createTransport({
                host: mail_domain,
                port: mail_port || 465,
                secure: true,
                auth: {
                    user: mail_username,
                    pass: mail_password,
                },
            });

            let mailObject = {};

            mailObject["from"] = `"Datasquirel SSO" <${
                sender || "support@datasquirel.com"
            }>`;
            mailObject["sender"] = sender || "support@datasquirel.com";
            mailObject["to"] = email;
            mailObject["subject"] = "One Time Login Code";
            mailObject["html"] = fs
                .readFileSync(
                    path.resolve(__dirname, "one-time-code.html"),
                    "utf-8"
                )
                .replace(/{{code}}/, tempCode);

            const info = await transporter.sendMail(mailObject);

            if (!info?.accepted) throw new Error("Mail not Sent!");

            /** ********************************************** */
            /** ********************************************** */
            /** ********************************************** */

            let setTempCode = await varDatabaseDbHandler({
                queryString: `UPDATE users SET ${email_login_field} = ? WHERE email = ?`,
                queryValuesArray: [tempCode + `-${Date.now()}`, email],
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
