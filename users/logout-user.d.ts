export = logoutUser;
/**
 * Logout user
 * ==============================================================================
 * @param {object} params - Single Param object containing params
 * @param {http.IncomingMessage} params.request - Http request object
 * @param {http.ServerResponse} params.response - Http response object
 * @param {string} [params.database] - Target database name(slug): optional => If you don't
 * include this you will be logged out of all datasquirel websites instead of just the target
 * database
 *
 * @returns {{success: boolean, payload: string}}
 */
declare function logoutUser({ request, response, database }: {
    request: http.IncomingMessage;
    response: http.ServerResponse;
    database?: string;
}): {
    success: boolean;
    payload: string;
};
import http = require("http");
