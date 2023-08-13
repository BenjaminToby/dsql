// @ts-check

const fs = require("fs");
require("dotenv").config({ path: "./../.env" });

////////////////////////////////////////

const dbHandler = require("./utils/dbHandler");
const varDatabaseDbHandler = require("./utils/varDatabaseDbHandler");

/** ****************************************************************************** */

const userId = process.argv.indexOf("--userId") >= 0 ? process.argv[process.argv.indexOf("--userId") + 1] : null;

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
async function recoverMainJsonFromDb() {
    if (!userId) {
        console.log("No user Id provided");
        return;
    }

    const databases = await dbHandler({
        query: `SELECT * FROM user_databases WHERE user_id = ?`,
        values: [userId],
    });

    /** @type {*[]} */
    const dbWrite = [];

    for (let i = 0; i < databases.length; i++) {
        const { id, db_name, db_slug, db_full_name, db_image, db_description } = databases[i];

        const dbObject = {
            dbName: db_name,
            dbSlug: db_slug,
            dbFullName: db_full_name,
            dbDescription: db_description,
            dbImage: db_image,
            /** @type {*[]} */
            tables: [],
        };

        const tables = await dbHandler({
            query: `SELECT * FROM user_database_tables WHERE user_id = ? AND db_id = ?`,
            values: [userId, id],
        });

        for (let j = 0; j < tables.length; j++) {
            const { table_name, table_slug, table_description } = tables[j];

            const tableObject = {
                tableName: table_slug,
                tableFullName: table_name,
                /** @type {*[]} */
                fields: [],
                /** @type {*[]} */
                indexes: [],
            };

            const tableFields = await varDatabaseDbHandler({
                database: db_full_name,
                queryString: `SHOW COLUMNS FROM ${table_slug}`,
            });

            if (tableFields) {
                for (let k = 0; k < tableFields.length; k++) {
                    const { Field, Type, Null, Default, Key } = tableFields[k];

                    const fieldObject = {
                        fieldName: Field,
                        dataType: Type.toUpperCase(),
                    };

                    if (Default?.match(/./) && !Default?.match(/timestamp/i)) fieldObject["defaultValue"] = Default;
                    if (Key?.match(/pri/i)) {
                        fieldObject["primaryKey"] = true;
                        fieldObject["autoIncrement"] = true;
                    }
                    if (Default?.match(/timestamp/i)) fieldObject["defaultValueLiteral"] = Default;
                    if (Null?.match(/yes/i)) fieldObject["nullValue"] = true;
                    if (Null?.match(/no/i)) fieldObject["notNullValue"] = true;

                    tableObject.fields.push(fieldObject);
                }
            }

            dbObject.tables.push(tableObject);
        }

        dbWrite.push(dbObject);
    }

    fs.writeFileSync(`./../jsonData/dbSchemas/users/user-${userId}/main.json`, JSON.stringify(dbWrite, null, 4), "utf-8");

    process.exit();
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

recoverMainJsonFromDb();
