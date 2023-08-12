require("dotenv").config({ path: "./../.env" });

////////////////////////////////////////

const noDatabaseDbHandler = require("../functions/backend/noDatabaseDbHandler");
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
    queryString: `SELECT user_database_tables.*,user_databases.db_full_name FROM user_database_tables JOIN user_databases ON user_database_tables.db_id=user_databases.id`,
    database: "datasquirel",
}).then(async (tables) => {
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const { id, user_id, db_id, db_full_name, table_name, table_slug, table_description } = table;

        const tableInfo = await varDatabaseDbHandler({
            queryString: `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='${db_full_name}' AND TABLE_NAME='${table_slug}'`,
            database: db_full_name,
        });

        const updateCreationDateTimestamp = await varDatabaseDbHandler({
            queryString: `ALTER TABLE \`${table_slug}\` MODIFY COLUMN date_created_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
            database: db_full_name,
        });

        const updateDateTimestamp = await varDatabaseDbHandler({
            queryString: `ALTER TABLE \`${table_slug}\` MODIFY COLUMN date_updated_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
            database: db_full_name,
        });

        console.log("Date Updated Column updated");
    }

    process.exit();
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
