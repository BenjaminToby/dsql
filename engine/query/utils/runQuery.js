// @ts-check

const fs = require("fs");

const addDbEntry = require("./addDbEntry");
const updateDbEntry = require("./updateDbEntry");
const deleteDbEntry = require("./deleteDbEntry");
const varDatabaseDbHandler = require("../../engine/utils/varDatabaseDbHandler");

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
 * @param {*} params.query - Query string or object
 * @param {boolean} [params.readOnly] - Is this operation read only?
 * @param {import("../../../types/database-schema.td").DSQL_DatabaseSchemaType} [params.dbSchema] - Database schema
 * @param {string[]} [params.queryValuesArray] - An optional array of query values if "?" is used in the query string
 * @param {string} [params.tableName] - Table Name
 *
 * @return {Promise<{result: *, error?: *}>}
 */
async function runQuery({ dbFullName, query, readOnly, dbSchema, queryValuesArray, tableName }) {
    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    const encryptionKey = process.env.DSQL_ENCRYPTION_KEY || "";
    const encryptionSalt = process.env.DSQL_ENCRYPTION_SALT || "";

    let result, error, tableSchema;

    if (dbSchema) {
        try {
            const table = tableName ? tableName : typeof query == "string" ? null : query ? query?.table : null;
            if (!table) throw new Error("No table name provided");
            tableSchema = dbSchema.tables.filter((tb) => tb?.tableName === table)[0];
        } catch (_err) {}
    }

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    try {
        if (typeof query === "string") {
            result = await varDatabaseDbHandler({
                queryString: query,
                queryValuesArray,
                database: dbFullName,
                tableSchema,
            });
        } else if (typeof query === "object") {
            /**
             * Declare variables
             *
             * @description Declare "results" variable
             */
            const { data, action, table, identifierColumnName, identifierValue, update, duplicateColumnName, duplicateColumnValue } = query;

            switch (action.toLowerCase()) {
                case "insert":
                    result = await addDbEntry({
                        dbFullName: dbFullName,
                        tableName: table,
                        data: data,
                        update,
                        duplicateColumnName,
                        duplicateColumnValue,
                        tableSchema,
                        encryptionKey,
                        encryptionSalt,
                    });

                    if (!result?.insertId) {
                        error = new Error("Couldn't insert data");
                    }

                    break;

                case "update":
                    result = await updateDbEntry({
                        dbContext: "Dsql User",
                        paradigm: "Full Access",
                        dbFullName: dbFullName,
                        tableName: table,
                        data: data,
                        identifierColumnName,
                        identifierValue,
                        tableSchema,
                        encryptionKey,
                        encryptionSalt,
                    });

                    break;

                case "delete":
                    result = await deleteDbEntry({
                        dbContext: "Dsql User",
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
    } catch (/** @type {*} */ error) {
        console.log("Error in Running Query =>", error.message);
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
