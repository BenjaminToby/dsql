// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const updateApiSchemaFromLocalDb = require("../query/update-api-schema-from-local-db");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Add `users` table to user database
 * ==============================================================================
 *
 * @param {object} params - Single object passed
 * @param {import("@/package-shared/types/database-schema.td").DSQL_DatabaseSchemaType | undefined} params.dbSchema - Database Schema Object
 *
 * @returns {Promise<*>} new user auth object payload
 */
module.exports = async function addUsersTableToDb({ dbSchema }) {
    /**
     * Initialize
     *
     * @description Initialize
     */
    const database = process.env.DSQL_DB_NAME || "";
    /** @type {import("@/package-shared/types/database-schema.td").DSQL_TableSchemaType} */
    const userPreset = require("./data/presets/users.json");

    try {
        /**
         * Fetch user
         *
         * @description Fetch user from db
         */
        const userSchemaMainFilePath = path.resolve(
            process.cwd(),
            "dsql.schema.json"
        );
        let targetDatabase = dbSchema;

        if (!targetDatabase) throw new Error("Target database not found!");

        let existingTableIndex = targetDatabase.tables.findIndex(
            (table, index) => {
                if (table.tableName === "users") {
                    existingTableIndex = index;
                    return true;
                }
            }
        );

        if (existingTableIndex >= 0) {
            targetDatabase.tables[existingTableIndex] = userPreset;
        } else {
            targetDatabase.tables.push(userPreset);
        }

        fs.writeFileSync(
            `${userSchemaMainFilePath}`,
            JSON.stringify(dbSchema, null, 4),
            "utf8"
        );

        ////////////////////////////////////////

        await updateApiSchemaFromLocalDb();

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log(error.message);
    }
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
