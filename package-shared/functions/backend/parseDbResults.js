// @ts-check

const decrypt = require("./decrypt");
const defaultFieldsRegexp = require("./defaultFieldsRegexp");

/**
 * Parse Database results
 * ==============================================================================
 * @description this function takes a database results array gotten from a DB handler
 * function, decrypts encrypted fields, and returns an updated array with no encrypted
 * fields
 *
 * @param {object} params - Single object params
 * @param {any[]} params.unparsedResults - Array of data objects containing Fields(keys)
 * and corresponding values of the fields(values)
 * @param {import("../../types").DSQL_TableSchemaType} [params.tableSchema] - Table schema
 * @returns {Promise<object[]|null>}
 */
module.exports = async function parseDbResults({
    unparsedResults,
    tableSchema,
}) {
    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let parsedResults = [];

    try {
        /**
         * Declare variables
         *
         * @description Declare "results" variable
         */
        for (let pr = 0; pr < unparsedResults.length; pr++) {
            let result = unparsedResults[pr];

            let resultFieldNames = Object.keys(result);

            for (let i = 0; i < resultFieldNames.length; i++) {
                const resultFieldName = resultFieldNames[i];
                let resultFieldSchema = tableSchema?.fields[i];

                if (resultFieldName?.match(defaultFieldsRegexp)) {
                    continue;
                }

                let value = result[resultFieldName];

                if (typeof value !== "number" && !value) {
                    // parsedResults.push(result);
                    continue;
                }

                if (resultFieldSchema?.encrypted) {
                    if (value?.match(/./)) {
                        result[resultFieldName] = decrypt(value);
                    }
                }
            }

            parsedResults.push(result);
        }

        /**
         * Declare variables
         *
         * @description Declare "results" variable
         */
        return parsedResults;
    } catch (/** @type {any} */ error) {
        console.log("ERROR in parseDbResults Function =>", error.message);
        return unparsedResults;
    }
};
