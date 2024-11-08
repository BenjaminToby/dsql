declare function _exports(): string | (import("tls").SecureContextOptions & {
    rejectUnauthorized?: boolean | undefined;
}) | undefined;
export = _exports;
