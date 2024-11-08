export = localGithubAuth;
/**
 * SERVER FUNCTION: Login with google Function
 * ==============================================================================
 *
 * @async
 *
 * @param {object} params - main params object
 * @param {http.ServerResponse} params.res - HTTPS response object
 * @param {string} params.code
 * @param {string} [params.email]
 * @param {string} params.clientId
 * @param {string} params.clientSecret
 * @param {object} [params.additionalFields]
 * @param {import("../../../package-shared/types").DSQL_DatabaseSchemaType} params.dbSchema
 */
declare function localGithubAuth({ res, code, email, clientId, clientSecret, additionalFields, dbSchema, }: {
    res: http.ServerResponse;
    code: string;
    email?: string;
    clientId: string;
    clientSecret: string;
    additionalFields?: object;
    dbSchema: import("../../../package-shared/types").DSQL_DatabaseSchemaType;
}): Promise<{
    success: boolean;
    msg: string;
} | {
    dsqlUserId: string;
    /**
     * - Did the operation complete successfully or not?
     */
    success: boolean;
    /**
     * - User payload object: or "null"
     */
    user: {
        id: number;
        first_name: string;
        last_name: string;
    } | null;
    /**
     * - Message
     */
    msg?: string;
    /**
     * - Error Message
     */
    error?: string;
    /**
     * - Social Id
     */
    social_id?: string | number;
    /**
     * - Social Platform
     */
    social_platform?: string;
    /**
     * - Payload
     */
    payload?: object;
    /**
     * - Alert
     */
    alert?: boolean;
    /**
     * - New User
     */
    newUser?: any;
}>;
import http = require("http");
