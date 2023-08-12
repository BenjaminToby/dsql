require("dotenv").config({ path: "./../.env" });

////////////////////////////////////////

const noDatabaseDbHandler = require("../functions/backend/noDatabaseDbHandler");
const serverError = require("../functions/backend/serverError");
const varDatabaseDbHandler = require("../functions/backend/varDatabaseDbHandler");
const createTable = require("./utils/createTable");
const updateTable = require("./utils/updateTable");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Grab Schema
 *
 * @description Grab Schema
 */
varDatabaseDbHandler({
    queryString: `SELECT DISTINCT db_id FROM user_database_tables`,
    database: "datasquirel",
}).then(async (tables) => {
    // console.log(tables);
    // process.exit();

    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];

        try {
            const { db_id } = table;
            const dbSlug = await global.DB_HANDLER(`SELECT db_slug FROM user_databases WHERE id='${db_id}'`);
            const updateTableSlug = await global.DB_HANDLER(`UPDATE user_database_tables SET db_slug='${dbSlug[0].db_slug}' WHERE db_id='${db_id}'`);
        } catch (error) {
            serverError({
                component: "shell/updateDbSlugsForTableRecords/main-catch-error",
                message: error.message,
                user: {},
            });
        }
    }

    process.exit();
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
