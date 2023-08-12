const fs = require("fs");
require("dotenv").config({ path: "./../.env" });

////////////////////////////////////////

const noDatabaseDbHandler = require("../functions/backend/noDatabaseDbHandler");
const serverError = require("../functions/backend/serverError");

const varDatabaseDbHandler = require("../functions/backend/varDatabaseDbHandler");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

async function updateChildrenTablesOnDb() {
    /**
     * Grab Schema
     *
     * @description Grab Schema
     */
    try {
        const rootDir = "./../jsonData/dbSchemas/users";
        const userFolders = fs.readdirSync(rootDir);

        for (let i = 0; i < userFolders.length; i++) {
            const folder = userFolders[i];
            const userId = folder.replace(/user-/, "");
            const databases = JSON.parse(fs.readFileSync(`${rootDir}/${folder}/main.json`));

            for (let j = 0; j < databases.length; j++) {
                const db = databases[j];
                const dbTables = db.tables;
                for (let k = 0; k < dbTables.length; k++) {
                    const table = dbTables[k];

                    if (table?.childTable) {
                        const originTableName = table.childTableName;
                        const originDbName = table.childTableDbFullName;

                        const WHERE_CLAUSE = `WHERE user_id='${userId}' AND db_slug='${db.dbSlug}' AND table_slug='${table.tableName}'`;

                        const existingTableInDb = await global.DB_HANDLER(`SELECT * FROM user_database_tables ${WHERE_CLAUSE}`);
                        console.log(existingTableInDb);

                        if (existingTableInDb && existingTableInDb[0]) {
                            const updateChildrenTablesInfo = await global.DB_HANDLER(`UPDATE user_database_tables SET child_table='1',child_table_parent_database='${originDbName}',child_table_parent_table='${originTableName}' WHERE id='${existingTableInDb[0].id}'`);

                            console.log(updateChildrenTablesInfo);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    process.exit();

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
}

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

// const userArg = process.argv[process.argv.indexOf("--user")];
// const externalUser = process.argv[process.argv.indexOf("--user") + 1];

updateChildrenTablesOnDb();
