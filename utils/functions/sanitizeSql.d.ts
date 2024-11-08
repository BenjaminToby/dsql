export = sanitizeSql;
/**
 * Sanitize SQL function
 * ==============================================================================
 * @description this function takes in a text(or number) or object or array or
 * boolean and returns a sanitized version of the same input.
 *
 * @param {string|number|object|boolean} input - Text or number or object or boolean
 * @param {boolean?} spaces - Allow spaces?
 *
 * @returns {string|number|object|boolean}
 */
declare function sanitizeSql(input: string | number | object | boolean, spaces: boolean | null): string | number | object | boolean;
