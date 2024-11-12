export = sqlInsertGenerator;
/**
 * @typedef {object} SQLINsertGenReturn
 * @property {string} query
 * @property {string[]} values
 */
/**
 * @param {object} param0
 * @param {any[]} param0.data
 * @param {string} param0.tableName
 *
 * @return {SQLINsertGenReturn | undefined}
 */
declare function sqlInsertGenerator({ tableName, data }: {
    data: any[];
    tableName: string;
}): SQLINsertGenReturn | undefined;
declare namespace sqlInsertGenerator {
    export { SQLINsertGenReturn };
}
type SQLINsertGenReturn = {
    query: string;
    values: string[];
};
