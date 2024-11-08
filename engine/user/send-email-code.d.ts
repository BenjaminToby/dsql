export = localSendEmailCode;
/**
 *
 * @param {object} param0
 * @param {string} param0.email
 * @param {import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined} [param0.dbSchema]
 * @param {string} param0.email_login_field
 * @param {string} [param0.mail_domain]
 * @param {string} [param0.mail_username]
 * @param {string} [param0.mail_password]
 * @param {number} [param0.mail_port]
 * @param {string} [param0.sender]
 * @returns
 */
declare function localSendEmailCode({ email, dbSchema, email_login_field, mail_domain, mail_username, mail_password, mail_port, sender, }: {
    email: string;
    dbSchema?: import("../../package-shared/types").DSQL_DatabaseSchemaType | undefined;
    email_login_field: string;
    mail_domain?: string;
    mail_username?: string;
    mail_password?: string;
    mail_port?: number;
    sender?: string;
}): Promise<{
    success: boolean;
    msg: string;
    payload?: undefined;
} | {
    success: boolean;
    payload: any;
    msg: string;
}>;
