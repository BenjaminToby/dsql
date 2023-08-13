// @ts-check

const encrypt = require("../../../functions/encrypt");
const dbHandler = require("../../engine/utils/dbHandler");

/**
 * Imports: Handle imports
 */

/**
 * Update DB Function
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
 * @param {*} params.data - Data to add
 * @param {import("../../../types/database-schema.td").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @param {string} params.identifierColumnName - Update row identifier column name
 * @param {string | number} params.identifierValue - Update row identifier column value
 * @param {string} params.encryptionKey - Encryption key
 * @param {string} params.encryptionSalt - Encryption salt
 *
 * @returns {Promise<object|null>}
 */
async function updateDbEntry({ dbContext, paradigm, dbFullName, tableName, data, tableSchema, identifierColumnName, identifierValue, encryptionKey, encryptionSalt }) {
    /**
     * Check if data is valid
     */
    if (!data || !Object.keys(data).length) return null;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    const dataKeys = Object.keys(data);

    let updateKeyValueArray = [];
    let updateValues = [];

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    for (let i = 0; i < dataKeys.length; i++) {
        try {
            const dataKey = dataKeys[i];
            let value = data[dataKey];

            const targetFieldSchemaArray = tableSchema ? tableSchema?.fields?.filter((field) => field.fieldName === dataKey) : null;
            const targetFieldSchema = targetFieldSchemaArray && targetFieldSchemaArray[0] ? targetFieldSchemaArray[0] : null;

            if (typeof value == "undefined") continue;
            if (typeof value !== "string" && typeof value !== "number" && !value) continue;

            if (targetFieldSchema?.encrypted) {
                value = encrypt({ data: value, encryptionKey, encryptionSalt });
            }

            if (typeof value === "object") {
                value = JSON.stringify(value);
            }

            if (typeof value === "string" && value.match(/^null$/i)) {
                value = {
                    toSqlString: function () {
                        return "NULL";
                    },
                };
            }

            if (typeof value === "string" && !value.match(/./i)) {
                value = {
                    toSqlString: function () {
                        return "NULL";
                    },
                };
            }

            if (!value && typeof value == "number" && value != 0) continue;

            updateKeyValueArray.push(`\`${dataKey}\`=?`);
            updateValues.push(value);

            ////////////////////////////////////////
            ////////////////////////////////////////
        } catch (/** @type {*} */ error) {
            ////////////////////////////////////////
            ////////////////////////////////////////

            console.log("DSQL: Error in parsing data keys in update function =>", error.message);
            continue;
        }
    }

    ////////////////////////////////////////
    ////////////////////////////////////////

    updateKeyValueArray.push(`date_updated='${Date()}'`);
    updateKeyValueArray.push(`date_updated_code='${Date.now()}'`);

    ////////////////////////////////////////
    ////////////////////////////////////////

    const query = `UPDATE ${tableName} SET ${updateKeyValueArray.join(",")} WHERE \`${identifierColumnName}\`=?`;

    updateValues.push(identifierValue);

    const updatedEntry = await dbHandler({
        database: dbFullName,
        query: query,
        values: updateValues,
    });

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Return statement
     */
    return updatedEntry;
}

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

module.exports = updateDbEntry;
