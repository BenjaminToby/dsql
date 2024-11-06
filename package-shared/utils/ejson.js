/**
 *
 * @param {string | null | number} string
 * @param {(this: any, key: string, value: any) => any} [reviver]
 * @returns {{ [key: string]: any } | { [key: string]: any }[] | undefined}
 */
function parse(string, reviver) {
    if (!string) return undefined;
    if (typeof string == "object") return string;
    if (typeof string !== "string") return undefined;
    try {
        return JSON.parse(string, reviver);
    } catch (error) {
        return undefined;
    }
}

/**
 *
 * @param {any} value
 * @param {(this: any, key: string, value: any) => any} [replacer]
 * @param { string | number } [space]
 * @returns {string | undefined}
 */
function stringify(value, replacer, space) {
    try {
        return JSON.stringify(value, replacer, space);
    } catch (error) {
        return undefined;
    }
}

const EJSON = {
    parse,
    stringify,
};

module.exports = EJSON;
