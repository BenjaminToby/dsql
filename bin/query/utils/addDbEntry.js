// @ts-check

/**
 * Imports: Handle imports
 */
const encrypt = require("../../../functions/encrypt");
const dbHandler = require("../../engine/utils/dbHandler");
const updateDb = require("./updateDbEntry");
const updateDbEntry = require("./updateDbEntry");

/**
 * Add a db Entry Function
 * ==============================================================================
 * @description Description
 * @async
 *
 * @param {object} params - An object containing the function parameters.
 * @param {("Master" | "Dsql User")} [params.dbContext] - What is the database context? "Master"
 * or "Dsql User". Defaults to "Master"
 * @param {("Read Only" | "Full Access")} [params.paradigm] - What is the paradigm for "Dsql User"?
 * "Read only" or "Full Access"? Defaults to "Read Only"
 * @param {string} params.dbFullName - Database full name
 * @param {string} params.tableName - Table name
 * @param {object} params.data - Data to add
 * @param {import("../../../types/database-schema.td").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @param {string} [params.duplicateColumnName] - Duplicate column name
 * @param {string} [params.duplicateColumnValue] - Duplicate column value
 * @param {boolean} [params.update] - Update this row if it exists
 * @param {string} [params.encryptionKey] - Update this row if it exists
 * @param {string} [params.encryptionSalt] - Update this row if it exists
 *
 * @returns {Promise<object|null>}
 */
async function addDbEntry({ dbContext, paradigm, dbFullName, tableName, data, tableSchema, duplicateColumnName, duplicateColumnValue, update, encryptionKey, encryptionSalt }) {
    /**
     * Initialize variables
     */

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Handle function logic
     */

    if (duplicateColumnName && typeof duplicateColumnName === "string") {
        const duplicateValue = await dbHandler({
            database: dbFullName,
            query: `SELECT * FROM \`${tableName}\` WHERE \`${duplicateColumnName}\`=?`,
            values: [duplicateColumnValue || ""],
        });

        if (duplicateValue && duplicateValue[0] && !update) {
            return null;
        } else if (duplicateValue && duplicateValue[0] && update) {
            return await updateDbEntry({
                dbContext,
                paradigm,
                dbFullName,
                tableName,
                data,
                tableSchema,
                identifierColumnName: duplicateColumnName,
                identifierValue: duplicateColumnValue || "",
            });
        }
    }

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    const dataKeys = Object.keys(data);

    let insertKeysArray = [];
    let insertValuesArray = [];

    for (let i = 0; i < dataKeys.length; i++) {
        try {
            const dataKey = dataKeys[i];
            let value = data[dataKey];

            const targetFieldSchemaArray = tableSchema ? tableSchema?.fields?.filter((field) => field.fieldName == dataKey) : null;
            const targetFieldSchema = targetFieldSchemaArray && targetFieldSchemaArray[0] ? targetFieldSchemaArray[0] : null;

            if (!value) continue;

            if (targetFieldSchema?.encrypted) {
                value = await encrypt({ data: value, encryptionKey, encryptionSalt });
                console.log("DSQL: Encrypted value =>", value);
            }

            insertKeysArray.push("`" + dataKey + "`");

            if (typeof value === "object") {
                value = JSON.stringify(value);
            }

            insertValuesArray.push(value);
        } catch (error) {
            console.log("DSQL: Error in parsing data keys =>", error.message);
            continue;
        }
    }

    ////////////////////////////////////////

    insertKeysArray.push("`date_created`");
    insertValuesArray.push(Date());

    insertKeysArray.push("`date_created_code`");
    insertValuesArray.push(Date.now());

    ////////////////////////////////////////

    insertKeysArray.push("`date_updated`");
    insertValuesArray.push(Date());

    insertKeysArray.push("`date_updated_code`");
    insertValuesArray.push(Date.now());

    ////////////////////////////////////////

    const query = `INSERT INTO \`${tableName}\` (${insertKeysArray.join(",")}) VALUES (${insertValuesArray.map(() => "?").join(",")})`;
    const queryValuesArray = insertValuesArray;

    const newInsert = await dbHandler({
        database: dbFullName,
        query: query,
        values: queryValuesArray,
    });

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Return statement
     */
    return newInsert;
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

module.exports = addDbEntry;
