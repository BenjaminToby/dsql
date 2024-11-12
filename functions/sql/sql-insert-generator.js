// @ts-check

/**
 * @typedef {object} SQLInsertGenReturn
 * @property {string} query
 * @property {string[]} values
 */

/**
 * @param {object} param0
 * @param {any[]} param0.data
 * @param {string} param0.tableName
 *
 * @return {SQLInsertGenReturn | undefined}
 */
function sqlInsertGenerator({ tableName, data }) {
    try {
        if (Array.isArray(data) && data?.[0]) {
            /** @type {string[]} */
            let insertKeys = [];

            data.forEach((dt) => {
                const kys = Object.keys(dt);
                kys.forEach((ky) => {
                    if (!insertKeys.includes(ky)) {
                        insertKeys.push(ky);
                    }
                });
            });

            /** @type {string[]} */
            let queryBatches = [];
            /** @type {string[]} */
            let queryValues = [];

            data.forEach((item) => {
                queryBatches.push(
                    `(${insertKeys
                        .map((ky) => {
                            queryValues.push(
                                item[ky]?.toString()?.match(/./)
                                    ? item[ky]
                                    : null
                            );
                            return "?";
                        })
                        .join(",")})`
                );
            });
            let query = `INSERT INTO ${tableName} (${insertKeys.join(
                ","
            )}) VALUES ${queryBatches.join(",")}`;

            return {
                query: query,
                values: queryValues,
            };
        } else {
            return undefined;
        }
    } catch (/** @type {any} */ error) {
        console.log(`SQL insert gen ERROR: ${error.message}`);
        return undefined;
    }
}

module.exports = sqlInsertGenerator;
