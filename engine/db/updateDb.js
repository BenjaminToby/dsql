/**
 * Imports: Handle imports
 */
const handler = require("../utils/handler");

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
module.exports = async function updateDb({ dbFullName, tableName, data, tableSchema, identifierColumnName, identifierValue, dbHost, dbPassword, dbUsername, encryptionKey, encryptionSalt }) {
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
        const dataKey = dataKeys[i];

        let value = data[dataKey];

        if (typeof value === "string" && value.match(/^null$/i)) value = "";

        if (!value && value != 0) continue;

        updateKeyValueArray.push(`\`${dataKey}\`=?`);
        updateValues.push(value);
    }

    /** ********************************************** */

    updateKeyValueArray.push(`date_updated='${Date()}'`);
    updateKeyValueArray.push(`date_updated_code='${Date.now()}'`);

    /** ********************************************** */

    const query = `UPDATE ${tableName} SET ${updateKeyValueArray.join(",")} WHERE \`${identifierColumnName}\`=?`;

    updateValues.push(identifierValue);

    const updatedEntry = await handler({
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
};
