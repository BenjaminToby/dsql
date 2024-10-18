// @ts-check

const runQuery = require("./utils/runQuery");

/**
 * @typedef {Object} LocalPostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - GET request results
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 */

/**
 * @typedef {Object} LocalPostQueryObject
 * @property {string | import("../../utils/post").PostDataPayload} query - Table Name
 * @property {string} [tableName] - Table Name
 * @property {string[]} [queryValues] - GET request results
 */

/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {LocalPostQueryObject} params.options - SQL Query
 * @param {DSQL_DatabaseSchemaType | undefined} [params.dbSchema] - Name of the table to query
 *
 * @returns { Promise<LocalPostReturn> } - Return Object
 */
async function localPost({ options, dbSchema }) {
    try {
        /**
         * Grab Body
         */
        const { query, tableName, queryValues } = options;
        const dbFullName = process.env.DSQL_DB_NAME || "";

        /**
         * Input Validation
         *
         * @description Input Validation
         */
        if (
            typeof query === "string" &&
            query?.match(/^create |^alter |^drop /i)
        ) {
            return { success: false, msg: "Wrong Input" };
        }

        if (
            typeof query === "object" &&
            query?.action?.match(/^create |^alter |^drop /i)
        ) {
            return { success: false, msg: "Wrong Input" };
        }

        /**
         * Create new user folder and file
         *
         * @description Create new user folder and file
         */
        try {
            let { result, error } = await runQuery({
                dbFullName: dbFullName,
                query: query,
                dbSchema: dbSchema,
                queryValuesArray: queryValues,
                tableName,
            });

            if (error) throw error;

            return {
                success: true,
                payload: result,
                error: error,
            };

            ////////////////////////////////////////
        } catch (/** @type {*} */ error) {
            ////////////////////////////////////////

            return {
                success: false,
                payload: null,
                error: error.message,
            };
        }

        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        ////////////////////////////////////////
        console.log("Error in local post Request =>", error.message);

        return {
            success: false,
            payload: null,
            msg: "Something went wrong!",
        };

        ////////////////////////////////////////
    }
}

module.exports = localPost;
