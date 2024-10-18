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

module.exports = { Request, Response, ImageInputFileToBase64FunctionReturn };
