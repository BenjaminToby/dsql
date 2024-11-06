// @ts-check

const generator = require("generate-password");
const DB_HANDLER = require("../../utils/backend/global-db/DB_HANDLER");
const NO_DB_HANDLER = require("../../utils/backend/global-db/NO_DB_HANDLER");
const encrypt = require("./encrypt");
const addDbEntry = require("./db/addDbEntry");

/**
 * # Add Mariadb User
 *
 * @description this function adds a Mariadb user to the database server
 *
 * @param {object} params - parameters object *
 * @param {number | string} params.userId - invited user object
 *
 * @returns {Promise<any>} new user auth object payload
 */
module.exports = async function addMariadbUser({ userId }) {
    try {
        const defaultMariadbUserHost = process.env.DSQL_DB_HOST || "127.0.0.1";

        const username = `dsql_user_${userId}`;
        const password = generator.generate({
            length: 16,
            numbers: true,
            symbols: true,
            uppercase: true,
            exclude: "*#.'`\"",
        });
        const encryptedPassword = encrypt(password);

        await NO_DB_HANDLER(
            `CREATE USER IF NOT EXISTS '${username}'@'127.0.0.1' IDENTIFIED BY '${password}' REQUIRE SSL`
        );

        const updateUser = await DB_HANDLER(
            `UPDATE users SET mariadb_user = ?, mariadb_host = '127.0.0.1', mariadb_pass = ? WHERE id = ?`,
            [username, encryptedPassword, userId]
        );

        const addMariadbUser = await addDbEntry({
            tableName: "mariadb_users",
            data: {
                user_id: userId,
                username,
                host: defaultMariadbUserHost,
                password: encryptedPassword,
                primary: "1",
                grants: '[{"database":"*","table":"*","privileges":["ALL"]}]',
            },
            dbContext: "Master",
        });

        console.log(`User ${userId} SQL credentials successfully added.`);
    } catch (/** @type {any} */ error) {
        console.log(
            `Error in adding SQL user in 'addMariadbUser' function =>`,
            error.message
        );
    }
};

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
