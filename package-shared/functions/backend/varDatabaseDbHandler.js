// @ts-check

const fs = require("fs");
const parseDbResults = require("./parseDbResults");
const serverError = require("./serverError");
const DB_HANDLER = require("../../utils/backend/global-db/DB_HANDLER");
const DSQL_USER_DB_HANDLER = require("../../utils/backend/global-db/DSQL_USER_DB_HANDLER");

/**
 * DB handler for specific database
 * ==============================================================================
 * @async
 * @param {object} params - Single object params
 * @param {string} params.queryString - SQL string
 * @param {*[]} [params.queryValuesArray] - Values Array
 * @param {string} [params.database] - Database name
 * @param {import("../../types").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @returns {Promise<any>}
 */
module.exports = async function varDatabaseDbHandler({
    queryString,
    queryValuesArray,
    database,
    tableSchema,
}) {
    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    const isMaster = database?.match(/^datasquirel$/) ? true : false;

    /** @type {any} */
    const FINAL_DB_HANDLER = isMaster ? DB_HANDLER : DSQL_USER_DB_HANDLER;

    let results;

    /**
     * Fetch from db
     *
     * @description Fetch data from db if no cache
     */
    try {
        if (
            queryString &&
            queryValuesArray &&
            Array.isArray(queryValuesArray) &&
            queryValuesArray[0]
        ) {
            results = isMaster
                ? await FINAL_DB_HANDLER(queryString, queryValuesArray)
                : await FINAL_DB_HANDLER({
                      paradigm: "Full Access",
                      database,
                      queryString,
                      queryValues: queryValuesArray,
                  });
        } else {
            results = isMaster
                ? await FINAL_DB_HANDLER(queryString)
                : await FINAL_DB_HANDLER({
                      paradigm: "Full Access",
                      database,
                      queryString,
                  });
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (/** @type {any} */ error) {
        serverError({
            component: "varDatabaseDbHandler/lines-29-32",
            message: error.message,
        });
    }

    /**
     * Return results
     *
     * @description Return results add to cache if "req" param is passed
     */
    if (results && tableSchema) {
        try {
            const unparsedResults = results;
            const parsedResults = await parseDbResults({
                unparsedResults: unparsedResults,
                tableSchema: tableSchema,
            });
            return parsedResults;
        } catch (/** @type {any} */ error) {
            console.log(
                "\x1b[31mvarDatabaseDbHandler ERROR\x1b[0m =>",
                database,
                error
            );
            serverError({
                component: "varDatabaseDbHandler/lines-52-53",
                message: error.message,
            });
            return null;
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } else if (results) {
        return results;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } else {
        return null;
    }
};
