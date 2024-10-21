import http from "http";

export type DSQL_DatabaseFullName = string;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export interface DSQL_DatabaseSchemaType {
    dbName: string;
    dbSlug: string;
    dbFullName: string;
    dbDescription?: string;
    dbImage?: string;
    tables: DSQL_TableSchemaType[];
    childrenDatabases?: DSQL_ChildrenDatabaseObject[];
    childDatabase?: boolean;
    childDatabaseDbFullName?: string;
    updateData?: boolean;
}

export interface DSQL_ChildrenDatabaseObject {
    dbFullName: string;
}

////////////////////////////////////////

export interface DSQL_TableSchemaType {
    tableName: string;
    tableFullName: string;
    tableDescription?: string;
    fields: DSQL_FieldSchemaType[];
    indexes?: DSQL_IndexSchemaType[];
    childrenTables?: DSQL_ChildrenTablesType[];
    childTable?: boolean;
    updateData?: boolean;
    childTableName?: string;
    childTableDbFullName?: string;
    tableNameOld?: string;
}

export interface DSQL_ChildrenTablesType {
    dbNameFull: string;
    tableName: string;
    tableNameFull?: string;
}

////////////////////////////////////////

export interface DSQL_FieldSchemaType {
    fieldName?: string;
    originName?: string;
    updatedField?: boolean;
    dataType?: string;
    nullValue?: boolean;
    notNullValue?: boolean;
    primaryKey?: boolean;
    encrypted?: boolean;
    autoIncrement?: boolean;
    defaultValue?: string | number;
    defaultValueLiteral?: string;
    foreignKey?: DSQL_ForeignKeyType;
    richText?: boolean;
    json?: boolean;
    yaml?: boolean;
    html?: boolean;
    css?: boolean;
    javascript?: boolean;
    shell?: boolean;
    newTempField?: boolean;
    defaultField?: boolean;
    plainText?: boolean;
    unique?: boolean;
    pattern?: string;
    patternFlags?: string;
    onUpdate?: string;
    onUpdateLiteral?: string;
    onDelete?: string;
    onDeleteLiteral?: string;
    cssFiles?: string[];
}

export interface DSQL_ForeignKeyType {
    foreignKeyName?: string;
    destinationTableName?: string;
    destinationTableColumnName?: string;
    destinationTableColumnType?: string;
    cascadeDelete?: boolean;
    cascadeUpdate?: boolean;
}

////////////////////////////////////////

export interface DSQL_IndexSchemaType {
    indexName?: string;
    indexType?: string;
    indexTableFields?: DSQL_IndexTableFieldType[];
    alias?: string;
    newTempIndex?: boolean;
}

export interface DSQL_IndexTableFieldType {
    value: string;
    dataType: string;
}

export interface DSQL_MYSQL_SHOW_INDEXES_Type {
    Key_name: string;
    Table: string;
    Column_name: string;
    Collation: string;
    Index_type: string;
    Cardinality: string;
    Index_comment: string;
    Comment: string;
}

////////////////////////////////////////

export interface DSQL_MYSQL_SHOW_COLUMNS_Type {
    Field: string;
    Type: string;
    Null: string;
    Key: string;
    Default: string;
    Extra: string;
}

////////////////////////////////////////

export interface DSQL_MYSQL_FOREIGN_KEYS_Type {
    CONSTRAINT_NAME: string;
    CONSTRAINT_SCHEMA: string;
    TABLE_NAME: string;
}

////////////////////////////////////////

export interface DSQL_MYSQL_user_databases_Type {
    user_id: number;
    db_full_name: string;
    db_name: string;
    db_slug: string;
    db_image: string;
    db_description: string;
    active_clone: number;
    active_clone_parent_db: string;
}

export interface PackageUserLoginRequestBody {
    encryptionKey: string;
    payload: any;
    database: string;
    additionalFields?: string[];
    email_login?: boolean;
    email_login_code?: string;
    email_login_field?: string;
    token?: boolean;
    social?: boolean;
    dbSchema?: DSQL_DatabaseSchemaType;
}

export interface PackageUserLoginLocalBody {
    payload: any;
    additionalFields?: string[];
    email_login?: boolean;
    email_login_code?: string;
    email_login_field?: string;
    token?: boolean;
    social?: boolean;
    dbSchema?: DSQL_DatabaseSchemaType;
}

type Request = http.IncomingMessage;

type Response = http.ServerResponse;

type ImageInputFileToBase64FunctionReturn = {
    imageBase64: string;
    imageBase64Full: string;
    imageName: string;
    imageSize: number;
};

export interface GetReqQueryObject {
    db: string;
    query: string;
    queryValues?: string;
    tableName?: string;
}

type SerializeQueryFnType = (param0: SerializeQueryParams) => string;

export interface SerializeQueryParams {
    query: any;
}

// @ts-check

export interface DATASQUIREL_LoggedInUser {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    user_type?: string;
    username?: string;
    password: string;
    image?: string;
    image_thumbnail?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip_code?: string;
    social_login?: number;
    social_platform?: string;
    social_id?: string;
    more_user_data?: string;
    verification_status?: number;
    loan_officer_id?: number;
    is_admin?: number;
    admin_level?: number;
    admin_permissions?: string;
    uuid: string;
    temp_login_code?: string;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
    csrf_k?: string;
    logged_in_status?: boolean;
    date?: number;
    more_data?: any;
}

export interface AuthenticatedUser {
    success: boolean;
    payload: DATASQUIREL_LoggedInUser | null;
    msg?: string;
    userId?: number;
}

export interface SuccessUserObject {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface AddUserFunctionReturn {
    success: boolean;
    payload?: SuccessUserObject | null;
    msg?: string;
    sqlResult?: any;
}

export interface GoogleIdentityPromptNotification {
    getMomentType: () => string;
    getDismissedReason: () => string;
    getNotDisplayedReason: () => string;
    getSkippedReason: () => string;
    isDismissedMoment: () => boolean;
    isDisplayMoment: () => boolean;
    isDisplayed: () => boolean;
    isNotDisplayed: () => boolean;
    isSkippedMoment: () => boolean;
}

export interface UserDataPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    username: string;
}

export interface GetUserFunctionReturn {
    success: boolean;
    payload: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        phone: string;
        social_id: [string];
        image: string;
        image_thumbnail: string;
        verification_status: [number];
    };
}

export interface ReauthUserFunctionReturn {
    success: boolean;
    payload: DATASQUIREL_LoggedInUser | null;
    msg?: string;
    userId?: number;
    token?: string;
}

export interface UpdateUserFunctionReturn {
    success: boolean;
    payload?: Object[] | string;
}

export interface GetReturn {
    success: boolean;
    payload?: any;
    msg?: string;
    error?: string;
    schema?: DSQL_TableSchemaType;
}

interface PostReturn {
    success: boolean;
    payload?: PostInsertReturn | Object[] | string;
}

interface PostInsertReturn {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

interface PostDataPayload {
    action: "insert" | "update" | "delete";
    table: string;
    data?: object;
    identifierColumnName?: string;
    identifierValue?: string;
    duplicateColumnName?: string;
    duplicateColumnValue?: string;
    update?: boolean;
}

interface LocalPostReturn {
    success: boolean;
    payload?: PostInsertReturn | Object[] | string;
    msg?: string;
    error?: string;
}

interface LocalPostQueryObject {
    query: string | import("../../package-shared/types").PostDataPayload;
    tableName?: string;
    queryValues?: string[];
}
