export = handleSocialDb;
/**
 * Handle Social User Auth on Datasquirel Database
 * ==============================================================================
 *
 * @description This function handles all social login logic after the social user
 * has been authenticated and userpayload is present. The payload MUST contain the
 * specified fields because this funciton will create a new user if the authenticated
 * user does not exist.
 *
 * @param {{
 *  database: string|null|undefined,
 *  social_id: string|number,
 *  email: string,
 *  social_platform: string,
 *  payload: {
 *      social_id: string | number,
 *      email: string,
 *      social_platform: string,
 *      first_name: string,
 *      last_name: string,
 *      image: string,
 *      image_thumbnail: string,
 *      username: string,
 *  },
 *  res: http.ServerResponse,
 *  supEmail?: string | null,
 *  additionalFields?: object,
 * dbSchema: import("../../../../package-shared/types").DSQL_DatabaseSchemaType | undefined
 * }} params - function parameters inside an object
 *
 * @returns {Promise<FunctionReturn>} - Response object
 */
declare function handleSocialDb({ social_id, email, social_platform, payload, res, supEmail, additionalFields, dbSchema, }: {
    database: string | null | undefined;
    social_id: string | number;
    email: string;
    social_platform: string;
    payload: {
        social_id: string | number;
        email: string;
        social_platform: string;
        first_name: string;
        last_name: string;
        image: string;
        image_thumbnail: string;
        username: string;
    };
    res: http.ServerResponse;
    supEmail?: string | null;
    additionalFields?: object;
    dbSchema: import("../../../../package-shared/types").DSQL_DatabaseSchemaType | undefined;
}): Promise<FunctionReturn>;
declare namespace handleSocialDb {
    export { FunctionReturn };
}
import http = require("http");
type FunctionReturn = {
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
};
