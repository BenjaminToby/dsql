// @ts-check

const generateColumnDescription = require("./generateColumnDescription");
const supplementTable = require("./supplementTable");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 *
 * @param {object} param0
 * @param {string} param0.dbFullName
 * @param {string} param0.tableName
 * @param {any[]} param0.tableInfoArray
 * @param {(params: import("./varDatabaseDbHandler").VarDbHandlerParam)=>any} param0.varDatabaseDbHandler
 * @param {DSQL_DatabaseSchemaType} [param0.dbSchema]
 * @returns
 */
module.exports = async function createTable({
    dbFullName,
    tableName,
    tableInfoArray,
    varDatabaseDbHandler,
    dbSchema,
}) {
    /**
     * Format tableInfoArray
     *
     * @description Format tableInfoArray
     */
    const finalTable = supplementTable({ tableInfoArray: tableInfoArray });

    /**
     * Grab Schema
     *
     * @description Grab Schema
     */
    const createTableQueryArray = [];

    createTableQueryArray.push(`CREATE TABLE IF NOT EXISTS \`${tableName}\` (`);

    ////////////////////////////////////////

    let primaryKeySet = false;
    let foreignKeys = [];

    ////////////////////////////////////////

    for (let i = 0; i < finalTable.length; i++) {
        const column = finalTable[i];
        const { fieldName, foreignKey } = column;

        if (foreignKey) {
            foreignKeys.push({
                fieldName: fieldName,
                ...foreignKey,
            });
        }

        let { fieldEntryText, newPrimaryKeySet } = generateColumnDescription({
            columnData: column,
            primaryKeySet: primaryKeySet,
        });

        primaryKeySet = newPrimaryKeySet;

        ////////////////////////////////////////

        if (fieldName?.match(/updated_timestamp/i)) {
            fieldEntryText += " ON UPDATE CURRENT_TIMESTAMP";
        }

        ////////////////////////////////////////

        const comma = (() => {
            if (foreignKeys[0]) return ",";
            if (i === finalTable.length - 1) return "";
            return ",";
        })();

        createTableQueryArray.push("    " + fieldEntryText + comma);

        ////////////////////////////////////////
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    if (foreignKeys[0]) {
        foreignKeys.forEach((foreighKey, index, array) => {
            const {
                fieldName,
                destinationTableName,
                destinationTableColumnName,
                cascadeDelete,
                cascadeUpdate,
                foreignKeyName,
            } = foreighKey;

            const comma = (() => {
                if (index === foreignKeys.length - 1) return "";
                return ",";
            })();

            createTableQueryArray.push(
                `    CONSTRAINT \`${foreignKeyName}\` FOREIGN KEY (\`${fieldName}\`) REFERENCES \`${destinationTableName}\`(${destinationTableColumnName})${
                    cascadeDelete ? " ON DELETE CASCADE" : ""
                }${cascadeUpdate ? " ON UPDATE CASCADE" : ""}${comma}`
            );
        });
    }

    ////////////////////////////////////////

    createTableQueryArray.push(
        `) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;`
    );

    const createTableQuery = createTableQueryArray.join("\n");

    ////////////////////////////////////////

    const newTable = await varDatabaseDbHandler({
        queryString: createTableQuery,
        database: dbFullName,
    });

    return newTable;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
};

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
