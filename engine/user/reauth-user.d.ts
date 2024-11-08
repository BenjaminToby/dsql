export = localReauthUser;
/**
 *
 * @param {object} param0
 * @param {*} param0.existingUser
 * @param {string[]} [param0.additionalFields]
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} [param0.dbSchema]
 * @returns
 */
declare function localReauthUser({ existingUser, additionalFields, dbSchema }: {
    existingUser: any;
    additionalFields?: string[];
    dbSchema?: import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined;
}): Promise<{
    success: boolean;
    payload: any;
    msg: string;
    userId?: undefined;
} | {
    success: boolean;
    msg: string;
    payload: {
        id: any;
        first_name: any;
        last_name: any;
        username: any;
        email: any;
        phone: any;
        social_id: any;
        image: any;
        image_thumbnail: any;
        verification_status: any;
        social_login: any;
        social_platform: any;
        csrf_k: string;
        more_data: any;
        logged_in_status: boolean;
        date: number;
    };
    userId: string;
} | {
    success: boolean;
    msg: string;
    payload?: undefined;
    userId?: undefined;
}>;
