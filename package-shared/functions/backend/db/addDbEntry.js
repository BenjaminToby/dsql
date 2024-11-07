// @ts-check

/**
 * Imports: Handle imports
 */
const encrypt = require("../encrypt");
const sanitizeHtml = require("sanitize-html");
const sanitizeHtmlOptions = require("../html/sanitizeHtmlOptions");
const updateDb = require("./updateDbEntry");
const updateDbEntry = require("./updateDbEntry");
const _ = require("lodash");
const DB_HANDLER = require("../../../utils/backend/global-db/DB_HANDLER");
const DSQL_USER_DB_HANDLER = require("../../../utils/backend/global-db/DSQL_USER_DB_HANDLER");

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
 * @param {string} [params.dbFullName] - Database full name
 * @param {string} params.tableName - Table name
 * @param {any} params.data - Data to add
 * @param {import("../../../types").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @param {string} [params.duplicateColumnName] - Duplicate column name
 * @param {string} [params.duplicateColumnValue] - Duplicate column value
 * @param {boolean} [params.update] - Update this row if it exists
 * @param {string} [params.encryptionKey] - Update this row if it exists
 * @param {string} [params.encryptionSalt] - Update this row if it exists
 *
 * @returns {Promise<any>}
 */
async function addDbEntry({
    dbContext,
    paradigm,
    dbFullName,
    tableName,
    data,
    tableSchema,
    duplicateColumnName,
    duplicateColumnValue,
    update,
    encryptionKey,
    encryptionSalt,
}) {
    /**
     * Initialize variables
     */
    const isMaster = dbContext?.match(/dsql.user/i)
        ? false
        : dbFullName && !dbFullName.match(/^datasquirel$/)
        ? false
        : true;

    /** @type { any } */
    const dbHandler = isMaster ? DB_HANDLER : DSQL_USER_DB_HANDLER;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    if (data?.["date_created_timestamp"]) delete data["date_created_timestamp"];
    if (data?.["date_updated_timestamp"]) delete data["date_updated_timestamp"];
    if (data?.["date_updated"]) delete data["date_updated"];
    if (data?.["date_updated_code"]) delete data["date_updated_code"];
    if (data?.["date_created"]) delete data["date_created"];
    if (data?.["date_created_code"]) delete data["date_created_code"];

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Handle function logic
     */

    if (duplicateColumnName && typeof duplicateColumnName === "string") {
        const duplicateValue = isMaster
            ? await dbHandler(
                  `SELECT * FROM \`${tableName}\` WHERE \`${duplicateColumnName}\`=?`,
                  [duplicateColumnValue]
              )
            : await dbHandler({
                  paradigm: "Read Only",
                  database: dbFullName,
                  queryString: `SELECT * FROM \`${tableName}\` WHERE \`${duplicateColumnName}\`=?`,
                  queryValues: [duplicateColumnValue],
              });

        if (duplicateValue?.[0] && !update) {
            return null;
        } else if (duplicateValue && duplicateValue[0] && update) {
            return await updateDbEntry({
                dbContext,
                paradigm,
                dbFullName,
                tableName,
                data,
                tableSchema,
                encryptionKey,
                encryptionSalt,
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
            // @ts-ignore
            let value = data?.[dataKey];

            const targetFieldSchemaArray = tableSchema
                ? tableSchema?.fields?.filter(
                      (field) => field.fieldName == dataKey
                  )
                : null;
            const targetFieldSchema =
                targetFieldSchemaArray && targetFieldSchemaArray[0]
                    ? targetFieldSchemaArray[0]
                    : null;

            if (value == null || value == undefined) continue;

            if (
                targetFieldSchema?.dataType?.match(/int$/i) &&
                typeof value == "string" &&
                !value?.match(/./)
            )
                continue;

            if (targetFieldSchema?.encrypted) {
                value = encrypt(value, encryptionKey, encryptionSalt);
                console.log("DSQL: Encrypted value =>", value);
            }

            if (targetFieldSchema?.richText) {
                value = sanitizeHtml(value, sanitizeHtmlOptions);
            }

            if (targetFieldSchema?.pattern) {
                const pattern = new RegExp(
                    targetFieldSchema.pattern,
                    targetFieldSchema.patternFlags || ""
                );
                if (!pattern.test(value)) {
                    console.log("DSQL: Pattern not matched =>", value);
                    value = "";
                }
            }

            insertKeysArray.push("`" + dataKey + "`");

            if (typeof value === "object") {
                value = JSON.stringify(value);
            }

            if (typeof value == "number") {
                insertValuesArray.push(String(value));
            } else {
                insertValuesArray.push(value);
            }
        } catch (/** @type {any} */ error) {
            console.log("DSQL: Error in parsing data keys =>", error.message);
            continue;
        }
    }

    ////////////////////////////////////////

    if (!data?.["date_created"]) {
        insertKeysArray.push("`date_created`");
        insertValuesArray.push(Date());
    }

    if (!data?.["date_created_code"]) {
        insertKeysArray.push("`date_created_code`");
        insertValuesArray.push(Date.now());
    }

    ////////////////////////////////////////

    if (!data?.["date_updated"]) {
        insertKeysArray.push("`date_updated`");
        insertValuesArray.push(Date());
    }

    if (!data?.["date_updated_code"]) {
        insertKeysArray.push("`date_updated_code`");
        insertValuesArray.push(Date.now());
    }

    ////////////////////////////////////////

    const query = `INSERT INTO \`${tableName}\` (${insertKeysArray.join(
        ","
    )}) VALUES (${insertValuesArray.map(() => "?").join(",")})`;
    const queryValuesArray = insertValuesArray;

    const newInsert = isMaster
        ? await dbHandler(query, queryValuesArray)
        : await dbHandler({
              paradigm,
              database: dbFullName,
              queryString: query,
              queryValues: queryValuesArray,
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
