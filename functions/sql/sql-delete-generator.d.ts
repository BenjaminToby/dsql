export = sqlDeleteGenerator;
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
declare function sqlDeleteGenerator({ tableName, data }: {
    data: any;
    tableName: string;
}): SQLDeleteGenReturn | undefined;
declare namespace sqlDeleteGenerator {
    export { SQLDeleteGenReturn };
}
type SQLDeleteGenReturn = {
    query: string;
    values: string[];
};
