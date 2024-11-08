declare function _exports({ user, message, component, noMail, }: {
    user?: {
        id?: number | string;
        first_name?: string;
        last_name?: string;
        email?: string;
    } & any;
    message: string;
    component?: string;
    noMail?: boolean;
}): Promise<void>;
export = _exports;
