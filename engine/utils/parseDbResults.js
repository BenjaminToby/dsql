const decrypt = require("../../functions/decrypt");
const defaultFieldsRegexp = require("./defaultFieldsRegexp");

/**
 * Parse Database results
 * ==============================================================================
 * @description this function takes a database results array gotten from a DB handler
 * function, decrypts encrypted fields, and returns an updated array with no encrypted
 * fields
 *
 * @param {object} params - Single object params
 * @param {{}[]} params.unparsedResults - Array of data objects containing Fields(keys)
 * and corresponding values of the fields(values)
 * @param {DSQL_TableSchemaType} params.tableSchema - Table schema
 * @returns {object[]|null}
 */
module.exports = function parseDbResults({ unparsedResults, tableSchema, encryptionKey, encryptionSalt }) {
    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let parsedResults = [];

    /**
     * Check if query values array is an array
     */
    if (!unparsedResults || !Array.isArray(unparsedResults) || !unparsedResults[0]) {
        return unparsedResults;
    }

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
                try {
                    const resultFieldName = resultFieldNames[i];
                    let resultFieldSchema = tableSchema?.fields[i];

                    if (resultFieldName?.match(defaultFieldsRegexp)) {
                        continue;
                    }

                    let value = result[resultFieldName];

                    if (typeof value !== "number" && !value) {
                        continue;
                    }

                    if (resultFieldSchema?.encrypted) {
                        if (value?.match(/./)) {
                            result[resultFieldName] = decrypt({ encryptedString: value, encryptionKey, encryptionSalt });
                        }
                    }
                } catch (error) {
                    console.log("ERROR in parseDbResults Function =>", error.message);
                    continue;
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
    } catch (error) {
        console.log("ERROR in parseDbResults Function =>", error.message);
        return unparsedResults;
    }
};
