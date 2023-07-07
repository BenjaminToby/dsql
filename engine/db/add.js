/**
 * Imports: Handle imports
 */

const encrypt = require("../../functions/encrypt");
const handler = require("../utils/handler");
const sanitizeHtml = require("sanitize-html");
const sanitizeHtmlOptions = require("../utils/sanitizeHtmlOptions");
const updateDb = require("./updateDb");

/**
 * Add a db Entry Function
 * ==============================================================================
 * @description Description
 * @async
 *
 * @param {object} params - An object containing the function parameters.
 * @param {string} params.dbFullName - Database full name
 * @param {string} params.tableName - Table name
 * @param {object} params.data - Data to add
 * @param {DSQL_TableSchemaType?} params.tableSchema - Table schema
 * @param {string?} params.duplicateColumnName - Duplicate column name
 * @param {string?} params.duplicateColumnValue - Duplicate column value
 * @param {boolean?} params.update - Update this row if it exists
 * @param {string?} params.dbHost - Database host
 * @param {string?} params.dbPassword - Database password
 * @param {string?} params.dbUsername - Database username
 * @param {string?} params.encryptionKey - Encryption key
 * @param {string?} params.encryptionSalt - Encryption salt
 *
 * @returns {Promise<object|null>}
 */
module.exports = async function add({ dbFullName, tableName, data, tableSchema, duplicateColumnName, duplicateColumnValue, update, dbHost, dbPassword, dbUsername, encryptionKey, encryptionSalt }) {
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
        const duplicateValue = await handler({
            queryString: `SELECT * FROM \`${tableName}\` WHERE \`${duplicateColumnName}\`=?`,
            queryValuesArray: [duplicateColumnValue],
            database: dbFullName,
            dbHost,
            dbPassword,
            dbUsername,
        });

        if (duplicateValue && duplicateValue[0] && !update) {
            return null;
        } else if (duplicateValue && duplicateValue[0] && update) {
            return await updateDb({
                dbFullName,
                tableName,
                data,
                tableSchema,
                identifierColumnName: duplicateColumnName,
                identifierValue: duplicateColumnValue,
                dbHost,
                dbPassword,
                dbUsername,
                encryptionKey,
                encryptionSalt,
            });
        }
    } else if (duplicateColumnName && typeof duplicateColumnName === "object" && duplicateColumnValue && typeof duplicateColumnValue === "object") {
        const duplicateArray = duplicateColumnName.map((dupColName, index) => {
            return `\`${dupColName}\`='${duplicateColumnValue[index]}'`;
        });

        const duplicateValue = await handler({
            queryString: `SELECT * FROM ${tableName} WHERE ${duplicateArray.join(" AND ")}`,
            database: dbFullName,
        });

        if (duplicateValue && duplicateValue[0] && !update) {
            return null;
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

            const targetFieldSchemaArray = tableSchema ? tableSchema?.fields.filter((field) => field.fieldName === dataKey) : null;
            const targetFieldSchema = targetFieldSchemaArray && targetFieldSchemaArray[0] ? targetFieldSchemaArray[0] : null;

            if (!value) continue;

            if (targetFieldSchema?.encrypted) {
                value = encrypt({ data: value, encryptionKey, encryptionSalt });
            }

            if (targetFieldSchema?.richText) {
                value = sanitizeHtml(value, sanitizeHtmlOptions);
            }

            insertKeysArray.push("`" + dataKey + "`");

            if (typeof value === "object") {
                value = JSON.stringify(value);
            }

            insertValuesArray.push(value);
        } catch (error) {
            console.log("DSQL: Error in parsing data keys =>", error.message);
        }
    }

    /** ********************************************** */

    insertKeysArray.push("date_created");
    insertValuesArray.push(Date());

    insertKeysArray.push("date_created_code");
    insertValuesArray.push(Date.now());

    /** ********************************************** */

    insertKeysArray.push("date_updated");
    insertValuesArray.push(Date());

    insertKeysArray.push("date_updated_code");
    insertValuesArray.push(Date.now());

    /** ********************************************** */

    const query = `INSERT INTO \`${tableName}\` (${insertKeysArray.join(",")}) VALUES (${insertValuesArray.map(() => "?").join(",")})`;
    const queryValuesArray = insertValuesArray;

    const newInsert = await handler({
        queryString: query,
        database: dbFullName,
        queryValuesArray,
        dbHost,
        dbPassword,
        dbUsername,
        encryptionKey,
        encryptionSalt,
        tableSchema,
    });

    console.log("DSQL: New insert =>", newInsert);

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Return statement
     */
    return newInsert;
};
