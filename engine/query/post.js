// @ts-check

const runQuery = require("../../package-shared/functions/backend/db/runQuery");

/**
 * Make a get request to Datasquirel API
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {import("../../package-shared/types").LocalPostQueryObject} params.options - SQL Query
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} [params.dbSchema] - Name of the table to query
 *
 * @returns { Promise<import("../../package-shared/types").LocalPostReturn> } - Return Object
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
                local: true,
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
                error: error.message,
            };
        }

        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        ////////////////////////////////////////
        console.log("Error in local post Request =>", error.message);

        return {
            success: false,
            msg: "Something went wrong!",
        };

        ////////////////////////////////////////
    }
}

module.exports = localPost;
