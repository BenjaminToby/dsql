// @ts-check

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

const path = require("path");

////////////////////////////////////////

const noDatabaseDbHandler = require("./utils/noDatabaseDbHandler");
const varDatabaseDbHandler = require("./utils/varDatabaseDbHandler");
const createTable = require("./utils/createTable");
const updateTable = require("./utils/updateTable");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Create database from Schema
 * ==============================================================================
 * @description Create database from Schema. This function is called when the user
 * runs the "dsql create" command. `NOTE`: there must be a "dsql.schema.json" file
 * in the root of the project for this function to work
 *
 * @param {import("../../types/database-schema.td").DSQL_DatabaseSchemaType[]} dbSchema - An array of database schema objects
 */
async function createDbFromSchema(dbSchema) {
    try {
        /**
         * Grab Schema
         *
         * @description Grab Schema
         */

        if (!dbSchema || !Array.isArray(dbSchema) || !dbSchema[0]) {
            return;
        }

        for (let i = 0; i < dbSchema.length; i++) {
            /** @type {import("../../types/database-schema.td").DSQL_DatabaseSchemaType} */
            const database = dbSchema[i];
            const { dbFullName, tables } = database;

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////

            /** @type {{ dbFullName: string }[] | null} */
            const dbCheck = await noDatabaseDbHandler({ query: `SELECT SCHEMA_NAME AS dbFullName FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbFullName}'` });

            if (dbCheck && dbCheck[0]?.dbFullName) {
                // Database Exists
            } else {
                const newDatabase = await noDatabaseDbHandler({ query: `CREATE DATABASE IF NOT EXISTS \`${dbFullName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin` });
            }

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////

            /**
             * Select all tables
             * @type {{ TABLE_NAME: string }[] | null}
             * @description Select All tables in target database
             */
            const allTables = await noDatabaseDbHandler({ query: `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='${dbFullName}'` });

            let tableDropped;

            if (!allTables) {
                console.log("No Tables to Update");
                continue;
            }

            for (let tb = 0; tb < allTables.length; tb++) {
                const { TABLE_NAME } = allTables[tb];

                /**
                 * @description Check if TABLE_NAME is part of the tables contained
                 * in the user schema JSON. If it's not, the table is either deleted
                 * or the table name has been recently changed
                 */
                if (!tables.filter((_table) => _table.tableName === TABLE_NAME)[0]) {
                    const oldTableFilteredArray = tables.filter((_table) => _table.tableNameOld && _table.tableNameOld === TABLE_NAME);

                    /**
                     * @description Check if this table has been recently renamed. Rename
                     * table id true. Drop table if false
                     */
                    if (oldTableFilteredArray && oldTableFilteredArray[0]) {
                        console.log("Renaming Table");
                        await varDatabaseDbHandler({
                            queryString: `RENAME TABLE \`${oldTableFilteredArray[0].tableNameOld}\` TO \`${oldTableFilteredArray[0].tableName}\``,
                            database: dbFullName,
                        });
                    } else {
                        console.log(`Dropping Table from ${dbFullName}`);
                        // deepcode ignore reDOS: <NO user input>
                        await varDatabaseDbHandler({
                            queryString: `DROP TABLE \`${TABLE_NAME}\``,
                            database: dbFullName,
                        });

                        tableDropped = true;
                    }
                }
            }

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////

            /**
             * @description Iterate through each table and perform table actions
             */
            for (let t = 0; t < tables.length; t++) {
                const table = tables[t];

                if (tableDropped) continue;

                const { tableName, fields, indexes } = table;

                /**
                 * @description Check if table exists
                 */
                const tableCheck = await varDatabaseDbHandler({
                    queryString: `
                        SELECT EXISTS (
                            SELECT 
                            TABLE_NAME
                            FROM 
                            information_schema.TABLES 
                            WHERE 
                            TABLE_SCHEMA = ? AND
                            TABLE_NAME = ?
                            ) AS tableExists`,
                    queryValuesArray: [dbFullName, table.tableName],
                    database: dbFullName,
                });

                ////////////////////////////////////////

                if (tableCheck && tableCheck[0]?.tableExists > 0) {
                    /**
                     * @description Update table if table exists
                     */
                    const updateExistingTable = await updateTable({
                        dbFullName: dbFullName,
                        tableName: tableName,
                        tableInfoArray: fields,
                        dbSchema,
                        tableIndexes: indexes,
                        tableIndex: t,
                    });

                    if (table.childrenTables && table.childrenTables[0]) {
                        for (let ch = 0; ch < table.childrenTables.length; ch++) {
                            const childTable = table.childrenTables[ch];

                            const updateExistingChildTable = await updateTable({
                                dbFullName: childTable.dbNameFull,
                                tableName: childTable.tableName,
                                tableInfoArray: fields,
                                dbSchema,
                                tableIndexes: indexes,
                                clone: true,
                            });

                            // console.log(updateExistingChildTable);
                        }
                    }

                    ////////////////////////////////////////
                } else {
                    ////////////////////////////////////////

                    /**
                     * @description Create new Table if table doesnt exist
                     */
                    const createNewTable = await createTable({
                        tableName: tableName,
                        tableInfoArray: fields,
                        varDatabaseDbHandler,
                        dbFullName: dbFullName,
                        dbSchema,
                    });

                    if (indexes && indexes[0]) {
                        /**
                         * Handle DATASQUIREL Table Indexes
                         * ===================================================
                         * @description Iterate through each datasquirel schema
                         * table index(if available), and perform operations
                         */
                        if (indexes && indexes[0]) {
                            for (let g = 0; g < indexes.length; g++) {
                                const { indexType, indexName, indexTableFields, alias } = indexes[g];

                                if (!alias?.match(/./)) continue;

                                /**
                                 * @type {any[] | null}
                                 * @description All indexes from MYSQL db
                                 */
                                const allExistingIndexes = await varDatabaseDbHandler({
                                    queryString: `SHOW INDEXES FROM \`${tableName}\``,
                                    database: dbFullName,
                                });

                                /**
                                 * @description Check for existing Index in MYSQL db
                                 */
                                try {
                                    const existingKeyInDb = allExistingIndexes ? allExistingIndexes.filter((indexObject) => indexObject.Key_name === alias) : null;
                                    if (!existingKeyInDb?.[0]) throw new Error("This Index Does not Exist");
                                } catch (error) {
                                    /**
                                     * @description Create new index if determined that it
                                     * doesn't exist in MYSQL db
                                     */
                                    await varDatabaseDbHandler({
                                        queryString: `CREATE${indexType.match(/fullText/i) ? " FULLTEXT" : ""} INDEX \`${alias}\` ON ${tableName}(${indexTableFields
                                            .map((nm) => nm.value)
                                            .map((nm) => `\`${nm}\``)
                                            .join(",")}) COMMENT 'schema_index'`,
                                        database: dbFullName,
                                    });
                                }
                            }
                        }
                    }
                }

                ////////////////////////////////////////
            }
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (error) {
        console.log("Error in createDbFromSchema => ", error.message);
    }
}

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

module.exports = createDbFromSchema;
