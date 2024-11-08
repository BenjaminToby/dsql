export = localGoogleAuth;
/**
 * SERVER FUNCTION: Login with google Function
 * ==============================================================================
 *
 * @async
 *
 * @param {object} params - main params object
 * @param {string} params.token - Google access token gotten from the client side
 * @param {string} params.clientId - Google client id
 * @param {http.ServerResponse} params.response - HTTPS response object
 * @param {object} [params.additionalFields] - Additional Fields to be added to the user object
 * @param {import("../../../package-shared/types").DSQL_DatabaseSchemaType} [params.dbSchema] - Database Schema
 *
 * @returns { Promise<FunctionReturn> }
 */
declare function localGoogleAuth({ dbSchema, token, clientId, response, additionalFields, }: {
    token: string;
    clientId: string;
    response: http.ServerResponse;
    additionalFields?: object;
    dbSchema?: import("../../../package-shared/types").DSQL_DatabaseSchemaType;
}): Promise<FunctionReturn>;
declare namespace localGoogleAuth {
    export { FunctionReturn };
}
import http = require("http");
type FunctionReturn = object | null;
