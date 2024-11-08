export = loginLocalUser;
/**
 *
 * @param {import("../../package-shared/types").PackageUserLoginLocalBody} param0
 * @returns
 */
declare function loginLocalUser({ payload, additionalFields, dbSchema, email_login, email_login_code, email_login_field, }: import("../../package-shared/types").PackageUserLoginLocalBody): Promise<{
    success: boolean;
    msg: string;
    payload?: undefined;
    userId?: undefined;
} | {
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
}>;
