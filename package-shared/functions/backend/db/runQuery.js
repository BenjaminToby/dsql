/** # MODULE TRACE 
======================================================================
 * Detected 3 files that call this module. The files are listed below:
======================================================================
 * `import` Statement Found in [get.js] => file:///d:\GitHub\datasquirel\pages\api\query\get.js
 * `import` Statement Found in [post.js] => file:///d:\GitHub\datasquirel\pages\api\query\post.js
 * `import` Statement Found in [add-user.js] => file:///d:\GitHub\datasquirel\pages\api\user\add-user.js
==== MODULE TRACE END ==== */

// @ts-check

const fs = require("fs");

const fullAccessDbHandler = require("../fullAccessDbHandler");
const varReadOnlyDatabaseDbHandler = require("../varReadOnlyDatabaseDbHandler");
const serverError = require("../serverError");

const addDbEntry = require("./addDbEntry");
const updateDbEntry = require("./updateDbEntry");
const deleteDbEntry = require("./deleteDbEntry");
const DB_HANDLER = require("../../../utils/backend/global-db/DB_HANDLER");
const parseDbResults = require("../parseDbResults");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Run DSQL users queries
 * ==============================================================================
 * @param {object} params - An object containing the function parameters.
 * @param {string} params.dbFullName - Database full name. Eg. "datasquire_user_2_test"
 * @param {string | any} params.query - Query string or object
 * @param {boolean} [params.readOnly] - Is this operation read only?
 * @param {boolean} [params.local] - Is this operation read only?
 * @param {import("../../../types").DSQL_DatabaseSchemaType} [params.dbSchema] - Database schema
 * @param {string[]} [params.queryValuesArray] - An optional array of query values if "?" is used in the query string
 * @param {string} [params.tableName] - Table Name
 *
 * @return {Promise<any>}
 */
async function runQuery({
    dbFullName,
    query,
    readOnly,
    dbSchema,
    queryValuesArray,
    tableName,
    local,
}) {
    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */

    /** @type {any} */
    let result;
    /** @type {any} */
    let error;
    /** @type {import("../../../types").DSQL_TableSchemaType | undefined} */
    let tableSchema;

    if (dbSchema) {
        try {
            const table = tableName
                ? tableName
                : typeof query == "string"
                ? null
                : query
                ? query?.table
                : null;
            if (!table) throw new Error("No table name provided");
            tableSchema = dbSchema.tables.filter(
                (tb) => tb?.tableName === table
            )[0];
        } catch (_err) {
            // console.log("ERROR getting tableSchema: ", _err.message);
        }
    }

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    try {
        if (typeof query === "string") {
            if (local) {
                const rawResults = await DB_HANDLER(query, queryValuesArray);
                result = tableSchema
                    ? parseDbResults({
                          unparsedResults: rawResults,
                          tableSchema,
                      })
                    : rawResults;
            } else if (readOnly) {
                result = await varReadOnlyDatabaseDbHandler({
                    queryString: query,
                    queryValuesArray,
                    database: dbFullName,
                    tableSchema,
                });
            } else {
                result = await fullAccessDbHandler({
                    queryString: query,
                    queryValuesArray,
                    database: dbFullName,
                    tableSchema,
                });
            }
        } else if (typeof query === "object") {
            /**
             * Declare variables
             *
             * @description Declare "results" variable
             */
            const {
                data,
                action,
                table,
                identifierColumnName,
                identifierValue,
                update,
                duplicateColumnName,
                duplicateColumnValue,
            } = query;

            switch (action.toLowerCase()) {
                case "insert":
                    result = await addDbEntry({
                        dbContext: local ? "Master" : "Dsql User",
                        paradigm: "Full Access",
                        dbFullName: dbFullName,
                        tableName: table,
                        data: data,
                        update,
                        duplicateColumnName,
                        duplicateColumnValue,
                        tableSchema,
                    });

                    if (!result?.insertId) {
                        error = new Error("Couldn't insert data");
                    }

                    break;

                case "update":
                    result = await updateDbEntry({
                        dbContext: local ? "Master" : "Dsql User",
                        paradigm: "Full Access",
                        dbFullName: dbFullName,
                        tableName: table,
                        data: data,
                        identifierColumnName,
                        identifierValue,
                        tableSchema,
                    });

                    break;

                case "delete":
                    result = await deleteDbEntry({
                        dbContext: local ? "Master" : "Dsql User",
                        paradigm: "Full Access",
                        dbFullName: dbFullName,
                        tableName: table,
                        identifierColumnName,
                        identifierValue,
                        tableSchema,
                    });

                    break;

                default:
                    result = null;
                    break;
            }
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (/** @type {any} */ error) {
        serverError({
            component: "functions/backend/runQuery",
            message: error.message,
        });
        result = null;
        error = error.message;
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return { result, error };

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
}

module.exports = runQuery;
