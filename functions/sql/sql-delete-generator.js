// @ts-check

/**
 * @typedef {object} SQLDeleteGenReturn
 * @property {string} query
 * @property {string[]} values
 */

/**
 * @param {object} param0
 * @param {any} param0.data
 * @param {string} param0.tableName
 *
 * @return {SQLDeleteGenReturn | undefined}
 */
function sqlDeleteGenerator({ tableName, data }) {
    try {
        let queryStr = `DELETE FROM ${tableName}`;

        /** @type {string[]} */
        let deleteBatch = [];
        /** @type {string[]} */
        let queryArr = [];

        Object.keys(data).forEach((ky) => {
            deleteBatch.push(`${ky}=?`);
            queryArr.push(data[ky]);
        });
        queryStr += ` WHERE ${deleteBatch.join(" AND ")}`;

        return {
            query: queryStr,
            values: queryArr,
        };
    } catch (/** @type {any} */ error) {
        console.log(`SQL delete gen ERROR: ${error.message}`);
        return undefined;
    }
}

module.exports = sqlDeleteGenerator;
