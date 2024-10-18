// @ts-check

const http = require("http");

/**
 * @typedef {http.IncomingMessage} Request
 */

/**
 * @typedef {http.ServerResponse} Response
 */

/**
 * @typedef {{
 *  imageBase64: string,
 *  imageBase64Full: string,
 *  imageName: string,
 *  imageSize: number,
 * }} ImageInputFileToBase64FunctionReturn
 */

/**
 * @typedef {object} GetReqQueryObject
 * @property {string} db
 * @property {string} query
 * @property {string} [queryValues]
 * @property {string} [tableName]
 */

/**
 * @typedef {(param0: SerializeQueryParams) => string} SerializeQueryFnType
 */

/**
 * @typedef {object} SerializeQueryParams
 * @property {any} query
 */
