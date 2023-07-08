/**
 * Imports: Handle imports
 */
const encrypt = require("../../functions/encrypt");
const sanitizeHtml = require("sanitize-html");
const sanitizeHtmlOptions = require("../utils/sanitizeHtmlOptions");
const dsqlDbHandler = require("../utils/dsqlDbHandler");

/**
 * Update DB Function
 * ==============================================================================
 * @description Description
 * @async
 *
 * @param {object} params - An object containing the function parameters.
 * @param {string} params.dbFullName - Database full name
 * @param {string} params.tableName - Table name
 * @param {object} params.data - Data to add
 * @param {DSQL_TableSchemaType?} params.tableSchema - Table schema
 * @param {string} params.identifierColumnName - Update row identifier column name
 * @param {string|number} params.identifierValue - Update row identifier column value
 * @param {boolean?} params.update - Update this row if it exists
 * @param {string?} params.dbHost - Database host
 * @param {string?} params.dbPassword - Database password
 * @param {string?} params.dbUsername - Database username
 * @param {string?} params.encryptionKey - Encryption key
 * @param {string?} params.encryptionSalt - Encryption salt
 *
 * @returns {Promise<object|null>}
 */
async function updateDb({ dbFullName, tableName, data, tableSchema, identifierColumnName, identifierValue, dbHost, dbPassword, dbUsername, encryptionKey, encryptionSalt }) {
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

    for (let i = 0; i < dataKeys.length; i++) {
        try {
            const dataKey = dataKeys[i];
            let value = data[dataKey];

            const targetFieldSchemaArray = tableSchema ? tableSchema?.fields?.filter((field) => field.fieldName === dataKey) : null;
            const targetFieldSchema = targetFieldSchemaArray && targetFieldSchemaArray[0] ? targetFieldSchemaArray[0] : null;

            if (!value) continue;

            if (targetFieldSchema?.encrypted) {
                value = encrypt({ data: value, encryptionKey, encryptionSalt });
            }

            if (targetFieldSchema?.richText) {
                value = sanitizeHtml(value, sanitizeHtmlOptions);
            }

            if (typeof value === "string" && value.match(/^null$/i)) value = "";
            if (typeof value === "object") {
                value = JSON.stringify(value);
            }

            if (!value && value != 0) continue;

            updateKeyValueArray.push(`\`${dataKey}\`=?`);
            updateValues.push(value);

            ////////////////////////////////////////
            ////////////////////////////////////////
        } catch (error) {
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

    const updatedEntry = await dsqlDbHandler({
        queryString: query,
        database: dbFullName,
        queryValuesArray: updateValues,
        dbHost,
        dbPassword,
        dbUsername,
        encryptionKey,
        encryptionSalt,
        tableSchema,
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

module.exports = updateDb;
