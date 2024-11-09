import type { IncomingMessage, ServerResponse } from "http";

import { Editor } from "tinymce";
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
    id: number;
    user_id: number;
    db_full_name: string;
    db_name: string;
    db_slug: string;
    db_image: string;
    db_description: string;
    active_clone: number;
    active_clone_parent_db: string;
    remote_connected?: number;
    remote_db_full_name?: string;
    remote_connection_host?: string;
    remote_connection_key?: string;
    remote_connection_type?: string;
    user_priviledge?: string;
    date_created?: string;
    image_thumbnail?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
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

type Request = IncomingMessage;

type Response = ServerResponse;

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

export type UserDataPayload = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    username: string;
} & {
    [key: string]: any;
};

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

export interface GetSchemaRequestQuery {
    database?: string;
    table?: string;
    field?: string;
}

export interface GetSchemaAPICredentialsParam {
    key: string;
}

export type GetSchemaAPIParam = GetSchemaRequestQuery &
    GetSchemaAPICredentialsParam;

export interface PostReturn {
    success: boolean;
    payload?: Object[] | string | PostInsertReturn;
}

export interface PostDataPayload {
    action: "insert" | "update" | "delete";
    table: string;
    data?: object;
    identifierColumnName?: string;
    identifierValue?: string;
    duplicateColumnName?: string;
    duplicateColumnValue?: string;
    update?: boolean;
}

export interface LocalPostReturn {
    success: boolean;
    payload?: any;
    msg?: string;
    error?: string;
}

export interface LocalPostQueryObject {
    query: string | PostDataPayload;
    tableName?: string;
    queryValues?: string[];
}

export interface PostInsertReturn {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

export interface UserType {
    id: number;
    stripe_id?: string;
    first_name: string;
    last_name: string;
    email: string;
    bio?: string;
    username?: string;
    image: string;
    image_thumbnail: string;
    social_id?: string;
    verification_status?: number;
    social_platform?: string;
    social_login?: number;
    date?: number;
    phone?: number | string;
    csrf_k: string;
    logged_in_status: boolean;
}

export interface ApiKeyDef {
    name: string;
    scope: string;
    date_created: string;
    apiKeyPayload: string;
}

export interface MetricsType {
    dbCount: number;
    tablesCount: number;
    mediaCount: number;
    apiKeysCount: number;
}

export interface DashboardContextType {
    user?: UserType;
    databases?: DSQL_MYSQL_user_databases_Type[];
    setTargetDatabase?: React.Dispatch<
        React.SetStateAction<DSQL_MYSQL_user_databases_Type>
    >;
    targetDatabase?: DSQL_MYSQL_user_databases_Type;
    metrics?: MetricsType;
}

export interface AddDbContextType {
    user?: UserType;
    databases?: DSQL_MYSQL_user_databases_Type[];
    dbImage?: string | null | ImageObjectType;
    setDbImage?: React.Dispatch<
        React.SetStateAction<string | null | ImageObjectType>
    >;
    query?: any;
    duplicateDb?: DSQL_MYSQL_user_databases_Type;
}

export interface EditDbContextType {
    user?: UserType;
    database?: DSQL_MYSQL_user_databases_Type;
    dbImage?: string | null | ImageObjectType;
    setDbImage?: React.Dispatch<
        React.SetStateAction<string | null | ImageObjectType>
    >;
}

export interface RichTextEditorsRefArray {
    fieldName: string;
    ref: React.MutableRefObject<Editor>;
}

export interface JSONTextEditorsRefArray {
    fieldName: string;
    ref: React.MutableRefObject<AceAjax.Editor>;
}

export interface TableEntriesContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    table: DSQL_TableSchemaType;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    entries: any[];
    targetEntry?: any;
    setTargetEntry: React.Dispatch<React.SetStateAction<any>>;
    richTextEditors: React.MutableRefObject<RichTextEditorsRefArray[]>;
    jsonTextEditors: React.MutableRefObject<JSONTextEditorsRefArray[]>;
    query?: any;
    confirmedDelegetedUser?: any;
    activeEntries: any[] | null;
    setActiveEntries: React.Dispatch<React.SetStateAction<any[] | null>>;
    targetField: React.MutableRefObject<string>;
    searchTerm: React.MutableRefObject<string | null>;
    entriesCount: number;
}

export interface AddEntryContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    table: DSQL_TableSchemaType;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    richTextEditors: React.MutableRefObject<RichTextEditorsRefArray[]>;
    jsonTextEditors: React.MutableRefObject<JSONTextEditorsRefArray[]>;
    query: any;
    duplicateEntry?: any;
    confirmedDelegetedUser: any;
}

export interface UserDatabasesContextType {
    user: UserType;
    users: any[];
    targetUser: any;
    setTargetUser: React.Dispatch<React.SetStateAction<any>>;
    databases: DSQL_MYSQL_user_databases_Type[];
}

export interface SettingsPageContextType {
    user: UserType;
    image: any;
    setImage: React.Dispatch<React.SetStateAction<any>>;
    activeUser: any;
}

export interface MediaFolderPageContextType {
    user: UserType;
    media: any[];
    targetMedia: any;
    setTargetMedia: React.Dispatch<React.SetStateAction<any>>;
    folders: any[];
    query: any;
    staticHost: string;
    folder: string;
}

export interface TablesContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    tables: MYSQL_user_database_tables_table_def[];
    targetTable: MYSQL_user_database_tables_table_def | null;
    setTargetTable: React.Dispatch<
        React.SetStateAction<MYSQL_user_database_tables_table_def | null>
    >;
    query: any;
    confirmedDelegetedUser: any;
}

export interface EditTableContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    table: DSQL_TableSchemaType;
    tableFields: DSQL_FieldSchemaType[];
    setTableFields: React.Dispatch<
        React.SetStateAction<DSQL_FieldSchemaType[]>
    >;
    targetField: DSQL_FieldSchemaType | null;
    setTargetField: React.Dispatch<
        React.SetStateAction<DSQL_FieldSchemaType | null>
    >;
    pageRefresh: number;
    setPageRefresh: React.Dispatch<React.SetStateAction<number>>;
    refreshFieldsListRef: React.MutableRefObject<
        React.Dispatch<React.SetStateAction<number>> | undefined
    >;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    query: any;
    confirmedDelegetedUser: any;
}

export interface SingleDatabaseContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    tables: MYSQL_user_database_tables_table_def[];
    targetTable: MYSQL_user_database_tables_table_def | null;
    setTargetTable: React.Dispatch<
        React.SetStateAction<MYSQL_user_database_tables_table_def | null>
    >;
    query: any;
    confirmedDelegetedUser: any;
}

export interface ApiKeysContextType {
    user: UserType;
    apiKeys: any[];
    setApiKeys: React.Dispatch<React.SetStateAction<any[]>>;
    targetApiKey: any | null;
    setTargetApiKey: React.Dispatch<React.SetStateAction<any | null>>;
    newApiKey: any | null;
    setNewApiKey: React.Dispatch<React.SetStateAction<any | null>>;
}

export interface LoginFormContextType {
    user?: UserType | null;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    alert: string | boolean;
    setAlert: React.Dispatch<React.SetStateAction<string | boolean>>;
}

export interface CreateAccountContextType {
    user?: UserType | null;
    query: CreateAccountQueryType;
    invitingUser: any;
}

export interface CreateAccountQueryType {
    invite?: number;
    database_access?: string;
    priviledge?: string;
    email?: string;
}

export interface DocsAsidePageObject {
    id: number;
    title: string;
    slug: string;
    parent_id?: number;
    level?: number;
}

export interface AllUserUsersContextType {
    user: UserType;
    users: MYSQL_delegated_users_table_def[];
    targetUser: MYSQL_user_users_table_def | null;
    setTargetUser: React.Dispatch<
        React.SetStateAction<MYSQL_user_users_table_def | null>
    >;
    databases: DSQL_MYSQL_user_databases_Type[];
    pendingInvitations: MYSQL_invitations_table_def[];
    pendingInvitationsReceived: any[];
    adminUsers: any[];
    invitedAccounts: any[];
}

export interface AddSocialLoginContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    query: any;
    socialLogins: SocialLoginObjectType[];
}

export interface DelegatedDbContextType {
    user: UserType;
    users: MYSQL_user_users_table_def[];
    targetUser: MYSQL_user_users_table_def | null;
    setTargetUser: React.Dispatch<
        React.SetStateAction<MYSQL_user_users_table_def | null>
    >;
    database: DSQL_MYSQL_user_databases_Type;
}

export interface AddUserUserContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    table: DSQL_TableSchemaType;
    query: any;
    confirmedDelegetedUser: any;
}

export interface UserUsersContextType {
    user: UserType;
    users: MYSQL_user_users_table_def[];
    targetUser: MYSQL_user_users_table_def;
    setTargetUser: React.Dispatch<
        React.SetStateAction<MYSQL_user_users_table_def | null>
    >;
    database: DSQL_MYSQL_user_databases_Type;
    table: DSQL_TableSchemaType;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    query: any;
    confirmedDelegetedUser: any;
}

export interface DatabaseSingleUserContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    singleUser: MYSQL_user_users_table_def;
    table: DSQL_TableSchemaType;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    query: any;
    confirmedDelegetedUser: any;
}

export interface SingleUserUserContextType {
    user: UserType;
    singleUser: MYSQL_user_users_table_def;
}

export interface AddUserContextType {
    user: UserType;
    users: MYSQL_delegated_users_table_def[];
    databases: DSQL_MYSQL_user_databases_Type[];
    query: any;
}

export interface MediaContextType {
    user: UserType;
    media: MYSQL_user_media_table_def[];
    targetMedia: MYSQL_user_media_table_def | null;
    setTargetMedia: React.Dispatch<
        React.SetStateAction<MYSQL_user_media_table_def | null>
    >;
    folders: string[];
    staticHost: string;
}

export interface MediaSubFolderContextType {
    user: UserType;
    media: MYSQL_user_media_table_def[];
    targetMedia: MYSQL_user_media_table_def | null;
    setTargetMedia: React.Dispatch<
        React.SetStateAction<MYSQL_user_media_table_def | null>
    >;
    folders: string[];
    query: any;
    folder: string;
    staticHost: string;
}

export interface FieldsContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    table: DSQL_TableSchemaType;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    targetField: DSQL_FieldSchemaType | null;
    setTargetField: React.Dispatch<
        React.SetStateAction<DSQL_FieldSchemaType | null>
    >;
    refreshFieldsListRef: React.MutableRefObject<
        React.Dispatch<React.SetStateAction<number>> | undefined
    >;
    tableFields: DSQL_FieldSchemaType[];
    setTableFields: React.Dispatch<
        React.SetStateAction<DSQL_FieldSchemaType[]>
    >;
    updateTableAfterFieldsUpdateFunction: () => void;
    query: any;
    confirmedDelegetedUser: any;
}

export interface SingleTableContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    table: DSQL_TableSchemaType;
    tableRecord: MYSQL_user_database_tables_table_def;
    tableFields: DSQL_FieldSchemaType[];
    setTableFields: React.Dispatch<
        React.SetStateAction<DSQL_FieldSchemaType[]>
    >;
    tableIndexes: DSQL_IndexSchemaType[];
    setTableIndexes: React.Dispatch<
        React.SetStateAction<DSQL_IndexSchemaType[]>
    >;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    entries: any[];
    targetEntry: any;
    setTargetEntry: React.Dispatch<React.SetStateAction<any>>;
    richTextEditors: React.MutableRefObject<RichTextEditorsRefArray[]>;
    jsonTextEditors: React.MutableRefObject<JSONTextEditorsRefArray[]>;
    query: any;
    confirmedDelegetedUser: any;
    targetField: DSQL_FieldSchemaType | null;
    setTargetField: React.Dispatch<
        React.SetStateAction<DSQL_FieldSchemaType | null>
    >;
    refreshFieldsListRef: React.MutableRefObject<
        React.Dispatch<React.SetStateAction<number>>
    >;
    updateTableAfterFieldsUpdateFunction: () => void;
    entriesCount: number;
}

export interface SingleEntryContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    table: DSQL_TableSchemaType;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    entry: any;
    targetEntry: any;
    setTargetEntry: React.Dispatch<React.SetStateAction<any>>;
    richTextEditors: React.MutableRefObject<RichTextEditorsRefArray[]>;
    jsonTextEditors: React.MutableRefObject<JSONTextEditorsRefArray[]>;
    query: any;
    confirmedDelegetedUser: any;
    prevEntry: any;
    nextEntry: any;
}

export interface UserSchemaContextType {
    user: UserType;
    dbSchemaData: DSQL_DatabaseSchemaType[];
}

export interface ConnectContextType {
    user: UserType;
    query: any;
    mariadbUserCred: MariaDBUserCredType;
    mariadbUsers: MYSQL_mariadb_users_table_def[];
    targetMariadbUser: MYSQL_mariadb_users_table_def | null;
    setTargetMariadbUser: React.Dispatch<
        React.SetStateAction<MYSQL_mariadb_users_table_def | null>
    >;
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export interface MYSQL_mariadb_users_table_def {
    id?: number;
    user_id?: number;
    username?: string;
    host?: string;
    password?: string;
    primary?: number;
    grants?: string;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
}

export interface DbContextType {
    user?: UserType;
    databases?: DSQL_MYSQL_user_databases_Type[];
    targetDatabase?: DSQL_MYSQL_user_databases_Type;
    setTargetDatabase?: React.Dispatch<
        React.SetStateAction<DSQL_MYSQL_user_databases_Type>
    >;
}

export interface MariaDBUserCredType {
    mariadb_user?: string;
    mariadb_host?: string;
    mariadb_pass?: string;
}

export interface AddTableContextType {
    user: UserType;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    database: DSQL_MYSQL_user_databases_Type;
    tables: DSQL_TableSchemaType[];
    tableFields: DSQL_FieldSchemaType[];
    setTableFields: React.Dispatch<
        React.SetStateAction<DSQL_FieldSchemaType[]>
    >;
    targetField: DSQL_FieldSchemaType | null;
    setTargetField: React.Dispatch<
        React.SetStateAction<DSQL_FieldSchemaType | null>
    >;
    pageRefresh: number | null;
    setPageRefresh: React.Dispatch<React.SetStateAction<number>>;
    refreshFieldsListRef: React.MutableRefObject<
        React.Dispatch<React.SetStateAction<number>>
    >;
    query: any;
}

export interface DbSchemaContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    dbImage: string;
    setDbImage: React.Dispatch<React.SetStateAction<string>>;
    dbSchemaData: DSQL_DatabaseSchemaType[];
    tables: any[];
}

export interface DbShellContextType {
    user?: UserType;
    database?: DSQL_MYSQL_user_databases_Type;
    dbImage?: string;
    setDbImage?: React.Dispatch<React.SetStateAction<string>>;
    dbSchemaData?: DSQL_DatabaseSchemaType[];
    tables?: any[];
}

export interface DbConnectContextType {
    user: UserType;
    database: DSQL_MYSQL_user_databases_Type;
    targetDbSchema: DSQL_DatabaseSchemaType;
    query: any;
}

export interface ImageObjectType {
    imageName?: string;
    mimeType?: string;
    imageSize?: number;
    private?: boolean;
    imageBase64?: string;
    imageBase64Full?: string;
}

export interface FileObjectType {
    fileName?: string;
    private?: boolean;
    fileType?: string;
    fileSize?: number;
    fileBase64?: string;
    fileBase64Full?: string;
}

export interface SocialLoginObjectType {
    platform?: string;
    paradigm?: string;
    clientId?: string;
    clientSecret?: string;
    callbackUrl?: string;
    domain1?: string;
    domain2?: string;
    domain3?: string;
}

export interface DbConnectType {
    url: string;
    key: string;
    database: DSQL_MYSQL_user_databases_Type;
    dbSchema: DSQL_DatabaseSchemaType;
    type: "pull" | "push";
    remoteDbs?: DSQL_DatabaseSchemaType[];
    targetDb?: DSQL_DatabaseSchemaType;
}

export interface MYSQL_MediaType {
    id?: number;
    user_id?: number;
    media_name?: string;
    folder?: string;
    media_url?: string;
    media_thumbnail_url?: string;
    media_type?: string;
    width?: string;
    height?: string;
    size?: string;
    private?: string;
}

export interface UserFileObject {
    title?: string;
    path?: string;
    data?: string;
}

export interface UserFileObject2 {
    type?: string;
    name?: string;
    root?: string;
    content?: UserFileObject2[];
}

export interface MYSQL_user_users_table_def {
    id?: number;
    user_id?: number;
    invited_user_id?: number;
    database?: string;
    database_access?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    password?: string;
    phone?: string;
    user_type?: string;
    user_priviledge?: string;
    image?: string;
    image_thumbnail?: string;
    city?: string;
    state?: string;
    country?: string;
    zip_code?: string;
    address?: string;
    social_login?: number;
    social_platform?: string;
    social_id?: string;
    verification_status?: number;
    more_user_data?: string;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
    inviteeFirstName?: string;
    inviteeLastName?: string;
    inviteeEmail?: string;
    inviteeImage?: string;
}

export interface MYSQL_user_database_tables_table_def {
    id?: number;
    user_id?: number;
    db_id?: number;
    db_slug?: string;
    table_name?: string;
    table_slug?: string;
    table_description?: string;
    child_table?: number;
    child_table_parent_database?: string;
    child_table_parent_table?: string;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
}

export interface MYSQL_user_media_table_def {
    id?: number;
    user_id?: number;
    media_name?: string;
    folder?: string;
    media_url?: string;
    media_thumbnail_url?: string;
    media_path?: string;
    media_thumbnail_path?: string;
    media_type?: string;
    width?: number;
    height?: number;
    size?: number;
    private?: number;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
}

export interface MYSQL_delegated_users_table_def {
    id?: number;
    user_id?: number;
    delegated_user_id?: number;
    permissions?: string;
    permission_level_code?: number;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
}

export interface MYSQL_invitations_table_def {
    id?: number;
    inviting_user_id?: number;
    invited_user_email?: string;
    invitation_status?: string;
    database_access?: string;
    priviledge?: string;
    db_tables_data?: string;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
}

export interface MYSQL_docs_pages_table_def {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    content?: string;
    text_content?: string;
    level?: number;
    page_order?: number;
    parent_id?: number;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
}

export interface MYSQL_delegated_user_tables_table_def {
    id?: number;
    delegated_user_id?: number;
    root_user_id?: number;
    database?: string;
    table?: string;
    priviledge?: string;
    date_created?: string;
    date_created_code?: number;
    date_created_timestamp?: string;
    date_updated?: string;
    date_updated_code?: number;
    date_updated_timestamp?: string;
}

export type ApiKeyObject = {
    user_id: string | number;
    full_access?: boolean;
    sign: string;
    date_code: number;
    target_database?: string;
    target_table?: string;
};

export type AddApiKeyRequestBody = {
    api_key_name: string;
    api_key_slug: string;
    api_key_scope?: "fullAccess" | "readOnly";
    target_database?: string;
    target_table?: string;
};

export type CheckApiCredentialsFn = (
    param: CheckApiCredentialsFnParam
) => ApiKeyObject | null | undefined;
export type CheckApiCredentialsFnParam = {
    key?: string;
    database?: string;
    table?: string;
};

export type FetchApiFn = (
    url: string,
    options?: FetchApiOptions,
    contentType?: "json" | "text" | "html" | "blob" | "file"
) => Promise<any>;

export type FetchApiOptions = RequestInit & {
    method:
        | "POST"
        | "GET"
        | "DELETE"
        | "PUT"
        | "PATCH"
        | "post"
        | "get"
        | "delete"
        | "put"
        | "patch";
    body?: object | string;
    headers?: FetchHeader;
    query?: { [key: string]: any };
};

export type AuthCsrfHeaderName = "x-csrf-auth";

type FetchHeader = HeadersInit & {
    [key in AuthCsrfHeaderName]?: string | null;
} & {
    [key: string]: any;
};

export type FetchApiReturn = {
    success: boolean;
    payload: any;
    msg?: string;
    [key: string]: any;
};

export type ServerQueryParam = {
    selectFields?: string[];
    query?: ServerQueryQueryObject;
    limit?: number;
    order?: {
        field: string;
        strategy: "ASC" | "DESC";
    };
    searchOperator?: "AND" | "OR";
    searchEquality?: "EQUAL" | "LIKE";
    addUserId?: {
        fieldName: string;
    };
    join?: ServerQueryParamsJoin[];
} & {
    [key: string]: any;
};

export type ServerQueryQueryObject<T extends object = { [key: string]: any }> =
    {
        [key in keyof T]: {
            value: string | string[];
            operator?: "AND" | "OR";
            equality?: "EQUAL" | "LIKE";
            tableName?: string;
        };
    };

export type FetchDataParams = {
    path: string;
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    body?: object | string;
    query?: AuthFetchQuery;
};

export type AuthFetchQuery = ServerQueryParam & {
    [key: string]: string | number | { [key: string]: any };
};

export type ServerQueryParamsJoin = {
    joinType: "INNER JOIN" | "JOIN" | "LEFT JOIN" | "RIGHT JOIN";
    tableName: string;
    match?:
        | ServerQueryParamsJoinMatchObject
        | ServerQueryParamsJoinMatchObject[];
    selectFields?: (
        | string
        | {
              field: string;
              alias?: string;
          }
    )[];
};

export type ServerQueryParamsJoinMatchObject = {
    /** Field name from the **Root Table** */
    source: string | ServerQueryParamsJoinMatchSourceTargetObject;
    /** Field name from the **Join Table** */
    target: string | ServerQueryParamsJoinMatchSourceTargetObject;
};

export type ServerQueryParamsJoinMatchSourceTargetObject = {
    tableName: string;
    fieldName: string;
};

export type SqlGeneratorFn = (Param0: {
    genObject?: ServerQueryParam;
    tableName: string;
}) =>
    | {
          string: string;
          values: string[];
      }
    | undefined;
