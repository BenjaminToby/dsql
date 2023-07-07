require("dotenv").config({ path: "./../.env" });

/** ********************************************** */

const dbHandler = require("../functions/backend/dbHandler");
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

async function createDbFromSchema({ path }) {
    /**
     * Grab Schema
     *
     * @description Grab Schema
     */
    const dbSchema = require(path);

    for (let i = 0; i < dbSchema.length; i++) {
        const database = dbSchema[i];
        const { dbFullName, tables } = database;

        /** ********************************************** */

        // const showDatabases = await noDatabaseDbHandler(`SHOW DATABASES`);
        const dbCheck = await noDatabaseDbHandler(`SELECT SCHEMA_NAME AS dbFullName FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${dbFullName}'`);

        if (dbCheck && dbCheck[0]?.dbFullName) {
            // Database Exists
        } else {
            const newDatabase = await noDatabaseDbHandler(`CREATE DATABASE IF NOT EXISTS \`${dbFullName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin`);
        }

        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */

        /**
         * Handle Individual Tables
         *
         * @description Handle Individual Tables
         */
        const allTables = await noDatabaseDbHandler(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='${dbFullName}'`);

        let tableDropped;

        for (let tb = 0; tb < allTables.length; tb++) {
            const { TABLE_NAME } = allTables[tb];

            if (!tables.filter((_table) => _table.tableName === TABLE_NAME)[0]) {
                const oldTableFilteredArray = tables.filter((_table) => _table.tableNameOld && _table.tableNameOld === TABLE_NAME);

                if (oldTableFilteredArray && oldTableFilteredArray[0]) {
                    console.log("Renaming Table");
                    await varDatabaseDbHandler({
                        queryString: `RENAME TABLE \`${oldTableFilteredArray[0].tableNameOld}\` TO \`${oldTableFilteredArray[0].tableName}\``,
                        database: dbFullName,
                    });
                } else {
                    console.log(`Dropping Table from ${dbFullName}`);
                    await varDatabaseDbHandler({
                        queryString: `DROP TABLE \`${TABLE_NAME}\``,
                        database: dbFullName,
                    });

                    tableDropped = true;
                }
            }
        }

        /** ********************************************** */
        /** ********************************************** */
        /** ********************************************** */

        for (let t = 0; t < tables.length; t++) {
            const table = tables[t];

            if (tableDropped) continue;

            const { tableName, fields, indexes } = table;

            const tableCheck = await varDatabaseDbHandler({
                queryString: `
                    SELECT EXISTS (
                        SELECT 
                        TABLE_NAME
                        FROM 
                        information_schema.TABLES 
                        WHERE 
                        TABLE_SCHEMA = '${dbFullName}' AND
                        TABLE_NAME = '${table.tableName}'
                        ) AS tableExists`,
                database: dbFullName,
            });

            /** ********************************************** */

            if (tableCheck && tableCheck[0]?.tableExists > 0) {
                // Update Existing Table
                const updateExistingTable = await updateTable({
                    dbFullName: dbFullName,
                    tableName: tableName,
                    tableInfoArray: fields,
                    varDatabaseDbHandler,
                    userId,
                    dbSchema,
                    tableIndexes: indexes,
                });

                if (table.childrenTables && table.childrenTables[0]) {
                    for (let ch = 0; ch < table.childrenTables.length; ch++) {
                        const childTable = table.childrenTables[ch];

                        const updateExistingChildTable = await updateTable({
                            dbFullName: childTable.dbNameFull,
                            tableName: childTable.tableName,
                            tableInfoArray: fields,
                            varDatabaseDbHandler,
                            userId,
                            dbSchema,
                            tableIndexes: indexes,
                            clone: true,
                        });

                        console.log(updateExistingChildTable);
                    }
                }

                /** ********************************************** */
            } else {
                /** ********************************************** */

                // Create New Table
                const createNewTable = await createTable({ tableName: tableName, tableInfoArray: fields, varDatabaseDbHandler, dbFullName: dbFullName, dbSchema });
            }

            /** ********************************************** */
        }
    }

    process.exit();

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */
}

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

const path = process.argv[process.argv.indexOf("--path") + 1];

createDbFromSchema({ path });
