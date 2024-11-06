/** # MODULE TRACE 
======================================================================
 * No imports found for this Module
==== MODULE TRACE END ==== */

const runQuery = require("../../package-shared/functions/backend/db/runQuery");

// @ts-check

/**
 * @typedef {Object} LocalGetReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - GET request results
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 */

/**
 * @typedef {Object} LocalQueryObject
 * @property {string} query - Table Name
 * @property {string} [tableName] - Table Name
 * @property {string[]} [queryValues] - GET request results
 */

/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {LocalQueryObject} params.options - SQL Query
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} [params.dbSchema] - Name of the table to query
 *
 * @returns { Promise<LocalGetReturn> } - Return Object
 */
async function localGet({ options, dbSchema }) {
    try {
        const { query, queryValues } = options;

        /** @type {string | undefined | any } */
        const tableName = options?.tableName ? options.tableName : undefined;
        const dbFullName = process.env.DSQL_DB_NAME || "";

        /**
         * Input Validation
         *
         * @description Input Validation
         */
        if (
            typeof query == "string" &&
            (query.match(
                /^alter|^delete|information_schema|databases|^create/i
            ) ||
                !query.match(/^select/i))
        ) {
            return { success: false, msg: "Wrong Input" };
        }

        /**
         * Create new user folder and file
         *
         * @description Create new user folder and file
         */
        let results;

        try {
            let { result, error } = await runQuery({
                dbFullName: dbFullName,
                query: query,
                queryValuesArray: queryValues,
                dbSchema,
                tableName,
                local: true,
            });

            if (error) throw error;
            if (!result)
                throw new Error("No Result received for query => " + query);
            if (result?.error) throw new Error(result.error);

            results = result;
            return { success: true, payload: results };

            ////////////////////////////////////////
        } catch (/** @type {*} */ error) {
            ////////////////////////////////////////

            console.log("Error in local get Request =>", error.message);

            return {
                success: false,
                payload: null,
                error: error.message,
            };
        }

        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        ////////////////////////////////////////
        console.log("Error in local get Request =>", error.message);

        return { success: false, msg: "Something went wrong!" };

        ////////////////////////////////////////
    }
}

module.exports = localGet;
