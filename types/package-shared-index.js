// @ts-check

/**
 * @typedef {object} PackageUserLoginRequestBody
 * @property {string} encryptionKey
 * @property {any} payload
 * @property {string} database
 * @property {string[]} [additionalFields]
 * @property {boolean} [email_login]
 * @property {string} [email_login_code]
 * @property {string} [email_login_field]
 * @property {boolean} [token]
 * @property {boolean} [social]
 * @property {import("./database-schema.td").DSQL_DatabaseSchemaType} [dbSchema]
 */

/**
 * @typedef {object} PackageUserLoginLocalBody
 * @property {any} payload
 * @property {string[]} [additionalFields]
 * @property {boolean} [email_login]
 * @property {string} [email_login_code]
 * @property {string} [email_login_field]
 * @property {boolean} [token]
 * @property {boolean} [social]
 * @property {import("./database-schema.td").DSQL_DatabaseSchemaType} [dbSchema]
 */
