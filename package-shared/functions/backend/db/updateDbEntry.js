// @ts-check

/**
 * Imports: Handle imports
 */
const encrypt = require("../encrypt");
const sanitizeHtml = require("sanitize-html");
const sanitizeHtmlOptions = require("../html/sanitizeHtmlOptions");
const DB_HANDLER = require("../../../utils/backend/global-db/DB_HANDLER");
const DSQL_USER_DB_HANDLER = require("../../../utils/backend/global-db/DSQL_USER_DB_HANDLER");

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
 * @param {string} [params.dbFullName] - Database full name
 * @param {string} params.tableName - Table name
 * @param {string} [params.encryptionKey]
 * @param {string} [params.encryptionSalt]
 * @param {any} params.data - Data to add
 * @param {import("../../../types").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @param {string} params.identifierColumnName - Update row identifier column name
 * @param {string | number} params.identifierValue - Update row identifier column value
 *
 * @returns {Promise<object|null>}
 */
async function updateDbEntry({
    dbContext,
    paradigm,
    dbFullName,
    tableName,
    data,
    tableSchema,
    identifierColumnName,
    identifierValue,
    encryptionKey,
    encryptionSalt,
}) {
    /**
     * Check if data is valid
     */
    if (!data || !Object.keys(data).length) return null;

    const isMaster = dbContext?.match(/dsql.user/i)
        ? false
        : dbFullName && !dbFullName.match(/^datasquirel$/)
        ? false
        : true;

    /** @type {(a1:any, a2?:any)=> any } */
    const dbHandler = isMaster ? DB_HANDLER : DSQL_USER_DB_HANDLER;

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
            // @ts-ignore
            let value = data[dataKey];

            const targetFieldSchemaArray = tableSchema
                ? tableSchema?.fields?.filter(
                      (field) => field.fieldName === dataKey
                  )
                : null;
            const targetFieldSchema =
                targetFieldSchemaArray && targetFieldSchemaArray[0]
                    ? targetFieldSchemaArray[0]
                    : null;

            if (value == null || value == undefined) continue;

            if (targetFieldSchema?.richText) {
                value = sanitizeHtml(value, sanitizeHtmlOptions);
            }

            if (targetFieldSchema?.encrypted) {
                value = encrypt(value, encryptionKey, encryptionSalt);
            }

            if (typeof value === "object") {
                value = JSON.stringify(value);
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

            updateKeyValueArray.push(`\`${dataKey}\`=?`);

            if (typeof value == "number") {
                updateValues.push(String(value));
            } else {
                updateValues.push(value);
            }

            ////////////////////////////////////////
            ////////////////////////////////////////
        } catch (/** @type {any} */ error) {
            ////////////////////////////////////////
            ////////////////////////////////////////

            console.log(
                "DSQL: Error in parsing data keys in update function =>",
                error.message
            );
            continue;
        }
    }

    ////////////////////////////////////////
    ////////////////////////////////////////

    updateKeyValueArray.push(`date_updated='${Date()}'`);
    updateKeyValueArray.push(`date_updated_code='${Date.now()}'`);

    ////////////////////////////////////////
    ////////////////////////////////////////

    const query = `UPDATE ${tableName} SET ${updateKeyValueArray.join(
        ","
    )} WHERE \`${identifierColumnName}\`=?`;

    updateValues.push(identifierValue);

    const updatedEntry = isMaster
        ? await dbHandler(query, updateValues)
        : await dbHandler({
              paradigm,
              database: dbFullName,
              queryString: query,
              queryValues: updateValues,
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
