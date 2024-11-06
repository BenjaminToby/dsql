// @ts-check

/**
 * @typedef {string} DSQL_DatabaseFullName - Database full name(slug) including datasquirel data => "datasquirel_user_7_new_database"
 */

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * @typedef {object} DSQL_DatabaseSchemaType
 * @property {string} dbName - Database Full name with spaces => "New Database"
 * @property {string} dbSlug - Database Slug => "new_database"
 * @property {string} dbFullName - Database full name(slug) including datasquirel data => "datasquirel_user_7_new_database"
 * @property {string} [dbDescription] - Database brief description
 * @property {string} [dbImage] - Database image - Defaults to "/images/default.png"
 * @property {DSQL_TableSchemaType[]} tables - List of database tables
 * @property {DSQL_ChildrenDatabaseObject[]} [childrenDatabases] - List of children databases for current database which is parent
 * @property {boolean} [childDatabase] - If current database is a child of a different parent database
 * @property {string} [childDatabaseDbFullName] - Parent database full name => "datasquirel_user_7_new_database"
 * @property {boolean} [updateData] - Should the child database data update when the parent database data is updated?
 */

/**
 * @typedef {object} DSQL_ChildrenDatabaseObject
 * @property {string} dbFullName - Database Full name => "datasquirel_user_4_db_name"
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_TableSchemaType
 * @property {string} tableName - Table slug (blog_posts)
 * @property {string} tableFullName - Table full name with spaces => "Blog Posts"
 * @property {string} [tableDescription] - Brief description of table
 * @property {DSQL_FieldSchemaType[]} fields - List of table Fields
 * @property {DSQL_IndexSchemaType[]} [indexes] - List of table indexes, if available
 * @property {DSQL_ChildrenTablesType[]} [childrenTables] - List of children tables
 * @property {boolean} [childTable] -If current table is a child clone
 * @property {boolean} [updateData] -If the current table data updates with the parent table
 * @property {string} [childTableName] - Table slug of parent table => "blog_posts"
 * @property {string} [childTableDbFullName] - Database full name(slug) including datasquirel data => "datasquirel_user_7_new_database"
 * @property {string} [tableNameOld] - Old table name, incase of renaming table
 */

/**
 * @typedef {object} DSQL_ChildrenTablesType
 * @property {string} dbNameFull - Database full name(slug) including datasquirel data => "datasquirel_user_7_new_database"
 * @property {string} tableName - Table slug => "blog_posts"
 * @property {string} [tableNameFull]
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_FieldSchemaType
 * @property {string} [fieldName] - Field Name(slug) => "long_description"
 * @property {string} [originName] - Field origin name(optional)
 * @property {boolean} [updatedField] - Has this field been renamed?
 * @property {string} [dataType] - Field Data type => "BIGIN" | "LONGTEXT" | "VARCHAR(***)" | ...
 * @property {boolean} [nullValue] - Is this a null value or not?
 * @property {boolean} [notNullValue] - Is this NOT a null value?
 * @property {boolean} [primaryKey] - Is this the primary key for table?
 * @property {boolean} [encrypted] - Is this field value encrypted?
 * @property {boolean} [autoIncrement] - Does this table primary key increment automatically?
 * @property {string|number} [defaultValue] - Value of field by default
 * @property {string} [defaultValueLiteral] - SQL key word which generates value automatically => "CURRENT_TIMESTAMP"
 * @property {DSQL_ForeignKeyType} [foreignKey] - Field foreign key reference object
 * @property {boolean} [richText] - Rich text field
 * @property {boolean} [json]
 * @property {boolean} [yaml]
 * @property {boolean} [html]
 * @property {boolean} [css]
 * @property {boolean} [javascript]
 * @property {boolean} [shell]
 * @property {boolean} [newTempField]
 * @property {boolean} [defaultField]
 * @property {boolean} [plainText]
 * @property {boolean} [unique]
 * @property {string} [pattern]
 * @property {string} [patternFlags]
 * @property {string} [onUpdate]
 * @property {string} [onUpdateLiteral]
 * @property {string} [onDelete]
 * @property {string} [onDeleteLiteral]
 * @property {string[]} [cssFiles]
 */

/**
 * @typedef {object} DSQL_ForeignKeyType
 * @property {string} [foreignKeyName] - Unique Name of foreign key
 * @property {string} [destinationTableName] - Reference table name(slug) => "blog_posts"
 * @property {string} [destinationTableColumnName] - Reference column name(slug) => "id"
 * @property {string} [destinationTableColumnType] - Reference table field type => "BIGINT" | "VARCHAR(***)" | ...
 * @property {boolean} [cascadeDelete] - Does the reference table entry delete when this key is deleted?
 * @property {boolean} [cascadeUpdate] - Does the reference table entry update when this key is updated?
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_IndexSchemaType
 * @property {string} [indexName] - Unique Name of index => "blog_text_index"
 * @property {string} [indexType] - "regular" or "fullText"
 * @property {DSQL_IndexTableFieldType[]} [indexTableFields] - List of Index table fields
 * @property {string} [alias] - List of Index table fields
 * @property {boolean} [newTempIndex]
 */

/**
 * @typedef {object} DSQL_IndexTableFieldType
 * @property {string} value - Table Field Name
 * @property {string} dataType - Table Field data type "VARCHAR(***)" | "BIGINT" | ...
 */

/**
 * @typedef {object} DSQL_MYSQL_SHOW_INDEXES_Type
 * @property {string} Key_name - MYSQL Index Name
 * @property {string} Table - Table Name(slug)
 * @property {string} Column_name
 * @property {string} Collation
 * @property {string} Index_type - "FULL_TEXT" | ...
 * @property {string} Cardinality
 * @property {string} Index_comment
 * @property {string} Comment
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_MYSQL_SHOW_COLUMNS_Type
 * @property {string} Field - Field Name as represented in MSQL database
 * @property {string} Type - varchar(***) | tinyint | bigint | ...
 * @property {string} Null
 * @property {string} Key
 * @property {string} Default
 * @property {string} Extra
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_MYSQL_FOREIGN_KEYS_Type
 * @property {string} CONSTRAINT_NAME - Constraint Name => "PRIMARY" | "MUL" | null | ...
 * @property {string} CONSTRAINT_SCHEMA - Database name
 * @property {string} TABLE_NAME - Table name
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_MYSQL_user_databases_Type
 * @property {number} id
 * @property {number} user_id - User Id
 * @property {string} db_full_name - Database full name => eg. (dataasquirel_user_2_new_database)
 * @property {string} db_name - Database name with spaces => eg. (New Database)
 * @property {string} db_slug - Database slug => eg. (new_database)
 * @property {string} db_image - Database image path
 * @property {string} db_description - Database description
 * @property {number} active_clone - is Database active clone => 0 or 1
 * @property {string} active_clone_parent_db - Database parent db full name => eg. "datasquirel_user_7_wexculture"
 * @property {number} [remote_connected]
 * @property {string} [remote_db_full_name]
 * @property {string} [remote_connection_host]
 * @property {string} [user_priviledge]
 * @property {string} [date_created]
 * @property {string} [image_thumbnail]
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {string} [email]
 */

/**
 * @typedef {object} PackageUserLoginRequestBody
 * @property {string} encryptionKey
 * @property {any} payload
 * @property {string} database
 * @property {string[]} [additionalFields]
 * @property {boolean} [email_login]
 * @property {string} [email_login_code]
 * @property {string} [email_login_field]
 * @property {boolean} [token]
 * @property {boolean} [social]
 * @property {DSQL_DatabaseSchemaType} [dbSchema]
 */

/**
 * @typedef {object} PackageUserLoginLocalBody
 * @property {any} payload
 * @property {string[]} [additionalFields]
 * @property {boolean} [email_login]
 * @property {string} [email_login_code]
 * @property {string} [email_login_field]
 * @property {boolean} [token]
 * @property {boolean} [social]
 * @property {DSQL_DatabaseSchemaType} [dbSchema]
 */

const http = require("http");

/**
 * @typedef {http.IncomingMessage} Request
 */

/**
 * @typedef {http.ServerResponse} Response
 */

/**
 * @typedef {{
 *  imageBase64: string,
 *  imageBase64Full: string,
 *  imageName: string,
 *  imageSize: number,
 * }} ImageInputFileToBase64FunctionReturn
 */

/**
 * @typedef {object} GetReqQueryObject
 * @property {string} db
 * @property {string} query
 * @property {string} [queryValues]
 * @property {string} [tableName]
 */

/**
 * @typedef {(param0: SerializeQueryParams) => string} SerializeQueryFnType
 */

/**
 * @typedef {object} SerializeQueryParams
 * @property {any} query
 */

// @ts-check

/**
 * @typedef {object} DATASQUIREL_LoggedInUser
 * @property {number} [id]
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [user_type]
 * @property {string} [username]
 * @property {string} password
 * @property {string} [image]
 * @property {string} [image_thumbnail]
 * @property {string} [address]
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [country]
 * @property {string} [zip_code]
 * @property {number} [social_login]
 * @property {string} [social_platform]
 * @property {string} [social_id]
 * @property {string} [more_user_data]
 * @property {number} [verification_status]
 * @property {number} [loan_officer_id]
 * @property {number} [is_admin]
 * @property {number} [admin_level]
 * @property {string} [admin_permissions]
 * @property {string} uuid
 * @property {string} [temp_login_code]
 * @property {string} [date_created]
 * @property {number} [date_created_code]
 * @property {string} [date_created_timestamp]
 * @property {string} [date_updated]
 * @property {number} [date_updated_code]
 * @property {string} [date_updated_timestamp]
 * @property {string} [csrf_k] - CSRF key
 * @property {boolean} [logged_in_status]
 * @property {number} [date]
 * @property {any} [more_data]
 */

/**
 * @typedef {object} AuthenticatedUser
 * @property {boolean} success - Did the function run successfully?
 * @property {DATASQUIREL_LoggedInUser  | null} payload - Payload of the response
 * @property {string} [msg] - An optional message
 * @property {number} [userId] - An optional message
 */

/**
 * @typedef {object} SuccessUserObject
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 */

/**
 * @typedef {object} AddUserFunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {SuccessUserObject | null} [payload] - Payload
 * @property {string} [msg]
 * @property {any} [sqlResult]
 */

/**
 * @typedef {object} GoogleIdentityPromptNotification
 * @property {function(): string} getMomentType - Notification moment type
 * @property {function(): string} getDismissedReason - Notification get Dismissed Reason
 * @property {function(): string} getNotDisplayedReason - Notification get Not Displayed Reason
 * @property {function(): string} getSkippedReason - Notification get Skipped Reason
 * @property {function(): boolean} isDismissedMoment - Notification is Dismissed Moment
 * @property {function(): boolean} isDisplayMoment - Notification is Display Moment
 * @property {function(): boolean} isDisplayed - Notification is Displayed
 * @property {function(): boolean} isNotDisplayed - Notification is Not Displayed
 * @property {function(): boolean} isSkippedMoment - Notification is Skipped Moment
 */

/**
 * @typedef {UserDataPayloadBase & UserDataPayloadSupplement} UserDataPayload
 */

/**
 * @typedef {object} UserDataPayloadBase
 * @property {string} first_name - First Name *Required
 * @property {string} last_name - Last Name *Required
 * @property {string} email - Email *Required
 * @property {string} password - Password *Required
 * @property {string} username - Username (Optional)
 */

/**
 * @typedef {Object.<string, any>} UserDataPayloadSupplement
 */

/**
 * @typedef {object} GetUserFunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{
 *   id: number,
 *   first_name: string,
 *   last_name: string,
 *   username: string,
 *   email: string,
 *   phone: string,
 *   social_id: [string],
 *   image: string,
 *   image_thumbnail: string,
 *   verification_status: [number],
 * }} payload - Payload
 */

/**
 * @typedef {object} ReauthUserFunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {DATASQUIREL_LoggedInUser  | null} payload - Payload
 * @property {string} [msg] - Response Message
 * @property {number} [userId] - user ID
 * @property {string} [token] - new Token
 */

/**
 * @typedef {object} UpdateUserFunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {(Object[]|string)} [payload=[]] - Payload
 */

/**
 * @typedef {Object} GetReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - GET request results
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 * @property {DSQL_TableSchemaType} [schema] - Error Message
 */

/**
 * @typedef {object} GetSchemaRequestQuery
 * @property {string} [database] - Db Name. eg `test_database`
 * @property {string} [table] - Table Name (slug) e.g `test_table`
 * @property {string} [field]
 */

/**
 * @typedef {object} GetSchemaAPICredentialsParam
 * @property {string} key - API FULL ACCESS Key
 */

/**
 * @typedef {GetSchemaRequestQuery & GetSchemaAPICredentialsParam} GetSchemaAPIParam
 */

/**
 * @typedef {Object} PostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {PostInsertReturn | Object[] | string} [payload] - The Y Coordinate
 */

/**
 * @typedef {object} PostDataPayload
 * @property {"insert" | "update" | "delete"} action - The target action to take
 * @property {string} table - Table name(slug) eg "blog_posts"
 * @property {object} [data] - Table insert payload object => This must have keys that match
 * table fields
 * @property {string} [identifierColumnName] - Table identifier field name => eg. "id" OR "email"
 * @property {string} [identifierValue] - Corresponding value of the selected field name => This
 * checks identifies a the target row for "update" or "delete". Not needed for "insert"
 * @property {string} [duplicateColumnName] - Duplicate column name to check for
 * @property {string} [duplicateColumnValue] - Duplicate column value to match. If no "update" param
 * provided, function will return null
 * @property {boolean} [update] - Should the "insert" action update the existing entry if indeed
 * the entry with "duplicateColumnValue" exists?
 */

/**
 * @typedef {Object} LocalPostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {*} [payload] - GET request results
 * @property {string} [msg] - Message
 * @property {string} [error] - Error Message
 */

/**
 * @typedef {Object} LocalPostQueryObject
 * @property {PostDataPayload | string} query - Table Name
 * @property {string} [tableName] - Table Name
 * @property {string[]} [queryValues] - GET request results
 */

/**
 * @typedef {object} PostInsertReturn
 * @property {number} fieldCount
 * @property {number} affectedRows
 * @property {number} insertId
 * @property {number} serverStatus
 * @property {number} warningCount
 * @property {string} message
 * @property {boolean} protocol41
 * @property {number} changedRows
 */

// @ts-check

const { Editor } = require("tinymce");

/**
 * @typedef {object} UserType
 * @property {number} id - user id (number)
 * @property {string} [stripe_id] - Stripe ID for payments
 * @property {string} first_name - User First Name
 * @property {string} last_name - User Last Name
 * @property {string} email - User Email Address
 * @property {string} [bio] - User Description HTML
 * @property {string} [username] - User Username
 * @property {string} image - User Full Image
 * @property {string} image_thumbnail - User Image Thumbnail
 * @property {string} [social_id] - User Social id if available
 * @property {number} [verification_status] - 0 or 1 or 2
 * @property {string} [social_platform] - Google or Facebook or Github
 * @property {number} [social_login] - 0 or 1 => is this user a social user(1) or not(0)
 * @property {number} [date] - Creation Date
 * @property {number | string} [phone]
 * @property {string} csrf_k - CSRF key
 * @property {boolean} logged_in_status - Is user logged in or not
 */

/**
 * @typedef {object} ApiKeyDef
 * @property {string} name
 * @property {string} scope
 * @property {string} date_created
 * @property {string} apiKeyPayload
 */

/**
 * @typedef {object} MetricsType
 * @property {number} dbCount
 * @property {number} tablesCount
 * @property {number} mediaCount
 * @property {number} apiKeysCount
 */

/**
 * @typedef {object} DashboardContextType
 * @property {UserType} [user]
 * @property {DSQL_MYSQL_user_databases_Type[]} [databases]
 * @property {React.Dispatch<React.SetStateAction<DSQL_MYSQL_user_databases_Type>>} [setTargetDatabase]
 * @property {DSQL_MYSQL_user_databases_Type} [targetDatabase]
 * @property {MetricsType} [metrics]
 */

/**
 * @typedef {object} AddDbContextType
 * @property {UserType} [user]
 * @property {DSQL_MYSQL_user_databases_Type[]} [databases]
 * @property {string | null | ImageObjectType} [dbImage]
 * @property {React.Dispatch<React.SetStateAction<string | null | ImageObjectType>>} [setDbImage]
 * @property {*} [query]
 * @property {DSQL_MYSQL_user_databases_Type} [duplicateDb]
 */

/**
 * @typedef {object} EditDbContextType
 * @property {UserType} [user]
 * @property {DSQL_MYSQL_user_databases_Type} [database]
 * @property {string | null | ImageObjectType} [dbImage]
 * @property {React.Dispatch<React.SetStateAction<string | null | ImageObjectType>>} [setDbImage]
 */

/**
 * @typedef {object} RichTextEditorsRefArray
 * @property {string} fieldName
 * @property {React.MutableRefObject<Editor>} ref
 */

/**
 * @typedef {object} JSONTextEditorsRefArray
 * @property {string} fieldName
 * @property {React.MutableRefObject<AceAjax.Editor>} ref
 */

/**
 * @typedef {object} TableEntriesContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType} table
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {any[]} entries
 * @property {any} [targetEntry]
 * @property {React.Dispatch<React.SetStateAction<any>>} setTargetEntry
 * @property {React.MutableRefObject<RichTextEditorsRefArray[]>} richTextEditors
 * @property {React.MutableRefObject<JSONTextEditorsRefArray[]>} jsonTextEditors
 * @property {any} [query]
 * @property {any} [confirmedDelegetedUser]
 * @property {any[] | null} activeEntries
 * @property {React.Dispatch<React.SetStateAction<any[] | null>>} setActiveEntries
 * @property {React.MutableRefObject<string>} targetField
 * @property {React.MutableRefObject<string|null>} searchTerm
 * @property {number}  entriesCount
 */

/**
 * @typedef {object} AddEntryContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType} table
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {React.MutableRefObject<RichTextEditorsRefArray[]>} richTextEditors
 * @property {React.MutableRefObject<JSONTextEditorsRefArray[]>} jsonTextEditors
 * @property {any} query
 * @property {any} [duplicateEntry]
 * @property {any} confirmedDelegetedUser
 */

/**
 * @typedef {object} UserDatabasesContextType
 * @property {UserType} user
 * @property {any[]} users
 * @property {any} targetUser
 * @property {React.Dispatch<React.SetStateAction<any>>} setTargetUser
 * @property {DSQL_MYSQL_user_databases_Type[]} databases
 */

/**
 * @typedef {object} SettingsPageContextType
 * @property {UserType} user
 * @property {any} image
 * @property {React.Dispatch<React.SetStateAction<any>>} setImage
 * @property {any} activeUser
 */

/**
 * @typedef {object} MediaFolderPageContextType
 * @property {UserType} user
 * @property {any[]} media
 * @property {any} targetMedia
 * @property {React.Dispatch<React.SetStateAction<any>>} setTargetMedia
 * @property {any[]} folders
 * @property {any} query
 * @property {string} staticHost
 * @property {string} folder
 */

/**
 * @typedef {object} TablesContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {MYSQL_user_database_tables_table_def[]} tables
 * @property {MYSQL_user_database_tables_table_def | null} targetTable
 * @property {React.Dispatch<React.SetStateAction<MYSQL_user_database_tables_table_def | null>>} setTargetTable
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 */

/**
 * @typedef {object} EditTableContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType} table
 * @property {DSQL_FieldSchemaType[]} tableFields
 * @property {React.Dispatch<React.SetStateAction<DSQL_FieldSchemaType[]>>} setTableFields
 * @property {DSQL_FieldSchemaType | null} targetField
 * @property {React.Dispatch<React.SetStateAction<DSQL_FieldSchemaType | null>>} setTargetField
 * @property {number} pageRefresh
 * @property {React.Dispatch<React.SetStateAction<number>>} setPageRefresh
 * @property {React.MutableRefObject<React.Dispatch<React.SetStateAction<number>> | undefined>} refreshFieldsListRef
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 */

/**
 * @typedef {object} SingleDatabaseContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {MYSQL_user_database_tables_table_def[]} tables
 * @property {MYSQL_user_database_tables_table_def | null} targetTable
 * @property {React.Dispatch<React.SetStateAction<MYSQL_user_database_tables_table_def | null>>} setTargetTable
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 */

/**
 * @typedef {object} ApiKeysContextType
 * @property {UserType} user
 * @property {any[]} apiKeys
 * @property {React.Dispatch<React.SetStateAction<any[]>>} setApiKeys
 * @property {any | null} targetApiKey
 * @property {React.Dispatch<React.SetStateAction<any | null>>} setTargetApiKey
 * @property {any | null} newApiKey
 * @property {React.Dispatch<React.SetStateAction<any | null>>} setNewApiKey
 */

/**
 * @typedef {object} LoginFormContextType
 * @property {UserType | null} [user]
 * @property {boolean} loading
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setLoading
 * @property {string | boolean} alert
 * @property {React.Dispatch<React.SetStateAction<string | boolean>>} setAlert
 */

/**
 * @typedef {object} CreateAccountContextType
 * @property {UserType | null} [user]
 * @property {CreateAccountQueryType} query
 * @property {any} invitingUser
 */

/**
 * @typedef {object} CreateAccountQueryType
 * @property {number} [invite]
 * @property {string} [database_access]
 * @property {string} [priviledge]
 * @property {string} [email]
 */

/**
 * @typedef {object} DocsAsidePageObject
 * @property {number} id
 * @property {string} title
 * @property {string} slug
 * @property {number} [parent_id]
 * @property {number} [level]
 */

/**
 * @typedef {object} AllUserUsersContextType
 * @property {UserType} user
 * @property {MYSQL_delegated_users_table_def[]} users
 * @property {MYSQL_user_users_table_def | null} targetUser
 * @property {React.Dispatch<React.SetStateAction<MYSQL_user_users_table_def | null>>} setTargetUser
 * @property {DSQL_MYSQL_user_databases_Type[]} databases
 * @property {MYSQL_invitations_table_def[]} pendingInvitations
 * @property {any[]} pendingInvitationsReceived
 * @property {any[]} adminUsers
 * @property {any[]} invitedAccounts
 */

/**
 * @typedef {object} AddSocialLoginContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {any} query
 * @property {SocialLoginObjectType[]} socialLogins
 */

/**
 * @typedef {object} DelegatedDbContextType
 * @property {UserType} user
 * @property {MYSQL_user_users_table_def[]} users
 * @property {MYSQL_user_users_table_def | null} targetUser
 * @property {React.Dispatch<React.SetStateAction<MYSQL_user_users_table_def | null>>} setTargetUser
 * @property {DSQL_MYSQL_user_databases_Type} database
 */

/**
 * @typedef {object} AddUserUserContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType} table
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 */

/**
 * @typedef {object} UserUsersContextType
 * @property {UserType} user
 * @property {MYSQL_user_users_table_def[]} users
 * @property {MYSQL_user_users_table_def} targetUser
 * @property {React.Dispatch<React.SetStateAction<MYSQL_user_users_table_def | null>>} setTargetUser
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType} table
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 */

/**
 * @typedef {object} DatabaseSingleUserContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {MYSQL_user_users_table_def} singleUser
 * @property {DSQL_TableSchemaType} table
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 */

/**
 * @typedef {object} SingleUserUserContextType
 * @property {UserType} user
 * @property {MYSQL_user_users_table_def} singleUser
 */

/**
 * @typedef {object} AddUserContextType
 * @property {UserType} user
 * @property {MYSQL_delegated_users_table_def[]} users
 * @property {DSQL_MYSQL_user_databases_Type[]} databases
 * @property {any} query
 */

/**
 * @typedef {object} MediaContextType
 * @property {UserType} user
 * @property {MYSQL_user_media_table_def[]} media
 * @property {MYSQL_user_media_table_def | null} targetMedia
 * @property {React.Dispatch<React.SetStateAction<MYSQL_user_media_table_def | null>>} setTargetMedia
 * @property {string[]} folders
 * @property {string} staticHost
 */

/**
 * @typedef {object} MediaSubFolderContextType
 * @property {UserType} user
 * @property {MYSQL_user_media_table_def[]} media
 * @property {MYSQL_user_media_table_def | null} targetMedia
 * @property {React.Dispatch<React.SetStateAction<MYSQL_user_media_table_def | null>>} setTargetMedia
 * @property {string[]} folders
 * @property {any} query
 * @property {string} folder
 * @property {string} staticHost
 */

/**
 * @typedef {object} FieldsContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType} table
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {DSQL_FieldSchemaType | null} targetField
 * @property {React.Dispatch<React.SetStateAction<DSQL_FieldSchemaType | null>>} setTargetField
 * @property {React.MutableRefObject<React.Dispatch<React.SetStateAction<number>> | undefined>} refreshFieldsListRef
 * @property {DSQL_FieldSchemaType[]} tableFields
 * @property {React.Dispatch<React.SetStateAction<DSQL_FieldSchemaType[]>>} setTableFields
 * @property {()=>void} updateTableAfterFieldsUpdateFunction
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 */

/**
 * @typedef {object} SingleTableContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType} table
 * @property {MYSQL_user_database_tables_table_def} tableRecord
 * @property {DSQL_FieldSchemaType[]} tableFields
 * @property {React.Dispatch<React.SetStateAction<DSQL_FieldSchemaType[]>>} setTableFields
 * @property {DSQL_IndexSchemaType[]} tableIndexes
 * @property {React.Dispatch<React.SetStateAction<DSQL_IndexSchemaType[]>>} setTableIndexes
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {any[]} entries
 * @property {any} targetEntry
 * @property {React.Dispatch<React.SetStateAction<any>>} setTargetEntry
 * @property {React.MutableRefObject<RichTextEditorsRefArray[]>} richTextEditors
 * @property {React.MutableRefObject<JSONTextEditorsRefArray[]>} jsonTextEditors
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 * @property {DSQL_FieldSchemaType | null} targetField
 * @property {React.Dispatch<React.SetStateAction<DSQL_FieldSchemaType | null>>} setTargetField
 * @property {React.MutableRefObject<React.Dispatch<React.SetStateAction<number>>>} refreshFieldsListRef
 * @property {()=>void} updateTableAfterFieldsUpdateFunction
 * @property {number} entriesCount
 */

/**
 * @typedef {object} SingleEntryContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType} table
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {any} entry
 * @property {any} targetEntry
 * @property {React.Dispatch<React.SetStateAction<any>>} setTargetEntry
 * @property {React.MutableRefObject<RichTextEditorsRefArray[]>} richTextEditors
 * @property {React.MutableRefObject<JSONTextEditorsRefArray[]>} jsonTextEditors
 * @property {any} query
 * @property {any} confirmedDelegetedUser
 * @property {any} prevEntry
 * @property {any} nextEntry
 */

/**
 * @typedef {object} UserSchemaContextType
 * @property {UserType} user
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 */

/**
 * @typedef {object} ConnectContextType
 * @property {UserType} user
 * @property {any} query
 * @property {MariaDBUserCredType} mariadbUserCred
 * @property {MYSQL_mariadb_users_table_def[]} mariadbUsers - All MariaDB Users including the primary User
 * @property {MYSQL_mariadb_users_table_def | null} targetMariadbUser
 * @property {React.Dispatch<React.SetStateAction<MYSQL_mariadb_users_table_def | null>>} setTargetMariadbUser
 * @property {number} refresh
 * @property {React.Dispatch<React.SetStateAction<number>>} setRefresh
 */

/**
 * @typedef {object} MYSQL_mariadb_users_table_def
 * @property {number} [id] - NULL=`NO` Key=`PRI` Default=`null` Extra=`auto_increment`
 * @property {number} [user_id] - NULL=`NO` Key=`MUL` Default=`null` Extra=``
 * @property {string} [username] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [host] - NULL=`YES` Key=`` Default=`%` Extra=``
 * @property {string} [password] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [primary] - NULL=`YES` Key=`` Default=`0` Extra=``
 * @property {string} [grants] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [date_created] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [date_created_code] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [date_created_timestamp] - NULL=`YES` Key=`` Default=`current_timestamp()` Extra=``
 * @property {string} [date_updated] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [date_updated_code] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [date_updated_timestamp] - NULL=`YES` Key=`` Default=`current_timestamp()` Extra=`on update current_timestamp()`
 */

/**
 * @typedef {object} DbContextType
 * @property {UserType} [user]
 * @property {DSQL_MYSQL_user_databases_Type[]} [databases]
 * @property {DSQL_MYSQL_user_databases_Type} [targetDatabase]
 * @property {React.Dispatch<React.SetStateAction<DSQL_MYSQL_user_databases_Type>>} [setTargetDatabase]
 */

/**
 * @typedef {object} MariaDBUserCredType
 * @property {string} [mariadb_user]
 * @property {string} [mariadb_host]
 * @property {string} [mariadb_pass]
 */

/**
 * @typedef {object} AddTableContextType
 * @property {UserType} user
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_TableSchemaType[]} tables
 * @property {DSQL_FieldSchemaType[]} tableFields
 * @property {React.Dispatch<React.SetStateAction<DSQL_FieldSchemaType[]>>} setTableFields
 * @property {DSQL_FieldSchemaType | null} targetField
 * @property {React.Dispatch<React.SetStateAction<DSQL_FieldSchemaType | null>>} setTargetField
 * @property {number | null} pageRefresh
 * @property {React.Dispatch<React.SetStateAction<number>>} setPageRefresh
 * @property {React.MutableRefObject<React.Dispatch<React.SetStateAction<number>>>} refreshFieldsListRef
 * @property {any} query
 */

/**
 * @typedef {object} DbSchemaContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {string} dbImage
 * @property {React.Dispatch<React.SetStateAction<string>>} setDbImage
 * @property {DSQL_DatabaseSchemaType[]} dbSchemaData
 * @property {any[]} tables
 */

/**
 * @typedef {object} DbShellContextType
 * @property {UserType} [user]
 * @property {DSQL_MYSQL_user_databases_Type} [database]
 * @property {string} [dbImage]
 * @property {React.Dispatch<React.SetStateAction<string>>} [setDbImage]
 * @property {DSQL_DatabaseSchemaType[]} [dbSchemaData]
 * @property {any[]} [tables]
 */

/**
 * @typedef {object} DbConnectContextType
 * @property {UserType} user
 * @property {DSQL_MYSQL_user_databases_Type} database
 * @property {DSQL_DatabaseSchemaType} targetDbSchema
 * @property {any} query
 */

/**
 * @typedef {object} ImageObjectType
 * @property {string} [imageName]
 * @property {string} [mimeType]
 * @property {number} [imageSize]
 * @property {boolean} [private]
 * @property {string} [imageBase64]
 * @property {string} [imageBase64Full]
 */

/**
 * @typedef {object} FileObjectType
 * @property {string} [fileName]
 * @property {boolean} [private]
 * @property {string} [fileType]
 * @property {number} [fileSize]
 * @property {string} [fileBase64]
 * @property {string} [fileBase64Full]
 */

/**
 * @typedef {object} SocialLoginObjectType
 * @property {string} [platform]
 * @property {string} [paradigm]
 * @property {string} [clientId]
 * @property {string} [clientSecret]
 * @property {string} [callbackUrl]
 * @property {string} [domain1]
 * @property {string} [domain2]
 * @property {string} [domain3]
 */

/**
 * @typedef {object} DbConnectType
 * @property {string} url - Remote URL
 * @property {string} key - Full Access API key
 * @property {DSQL_MYSQL_user_databases_Type} database - DSQL database entry
 * @property {DSQL_DatabaseSchemaType} dbSchema - Database JSON schema
 * @property {"pull" | "push"} type - Type of connection: "pull" or "push"
 * @property {DSQL_DatabaseSchemaType[]} [remoteDbs] - All Databases Pulled from the remote
 * @property {DSQL_DatabaseSchemaType} [targetDb] - The Target Database to be cloned
 */

/**
 * @typedef {object} MYSQL_MediaType
 * @property {number} [id]
 * @property {number} [user_id]
 * @property {string} [media_name]
 * @property {string} [folder]
 * @property {string} [media_url]
 * @property {string} [media_thumbnail_url]
 * @property {string} [media_type]
 * @property {string} [width]
 * @property {string} [height]
 * @property {string} [size]
 * @property {string} [private]
 */

/**
 * @typedef {object} UserFileObject
 * @property {string} [title]
 * @property {string} [path]
 * @property {string} [data]
 */

/**
 * @typedef {object} UserFileObject2
 * @property {string} [type]
 * @property {string} [name]
 * @property {string} [root]
 * @property {UserFileObject2[]} [content]
 */

/**
 * @typedef {object} MYSQL_user_users_table_def
 * @property {number} [id] - NULL=`NO` Key=`PRI` Default=`null` Extra=`auto_increment`
 * @property {number} [user_id] - NULL=`NO` Key=`MUL` Default=`null` Extra=``
 * @property {number} [invited_user_id] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [database] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [database_access] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [first_name] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [last_name] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [email] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [username] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [password] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [phone] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [user_type] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [user_priviledge] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [image] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [image_thumbnail] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [city] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [state] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [country] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [zip_code] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [address] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [social_login] - NULL=`YES` Key=`` Default=`0` Extra=``
 * @property {string} [social_platform] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [social_id] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [verification_status] - NULL=`YES` Key=`` Default=`0` Extra=``
 * @property {string} [more_user_data] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [date_created] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_created_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_created_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED`
 * @property {string} [date_updated] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_updated_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_updated_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED on update CURRENT_TIMESTAMP`
 * @property {string} [inviteeFirstName] - QUERY JOIN
 * @property {string} [inviteeLastName] - QUERY JOIN
 * @property {string} [inviteeEmail] - QUERY JOIN
 * @property {string} [inviteeImage] - QUERY JOIN
 */

/**
 * @typedef {object} MYSQL_user_database_tables_table_def
 * @property {number} [id] - NULL=`NO` Key=`PRI` Default=`null` Extra=`auto_increment`
 * @property {number} [user_id] - NULL=`NO` Key=`MUL` Default=`null` Extra=``
 * @property {number} [db_id] - NULL=`NO` Key=`MUL` Default=`null` Extra=``
 * @property {string} [db_slug] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [table_name] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [table_slug] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [table_description] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [child_table] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [child_table_parent_database] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [child_table_parent_table] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [date_created] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_created_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_created_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED`
 * @property {string} [date_updated] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_updated_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_updated_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED on update CURRENT_TIMESTAMP`
 */

/**
 * @typedef {object} MYSQL_user_media_table_def
 * @property {number} [id] - NULL=`NO` Key=`PRI` Default=`null` Extra=`auto_increment`
 * @property {number} [user_id] - NULL=`NO` Key=`MUL` Default=`null` Extra=``
 * @property {string} [media_name] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [folder] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [media_url] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [media_thumbnail_url] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [media_path] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [media_thumbnail_path] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [media_type] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [width] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [height] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [size] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [private] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [date_created] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_created_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_created_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED`
 * @property {string} [date_updated] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_updated_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_updated_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED on update CURRENT_TIMESTAMP`
 */

/**
 * @typedef {object} MYSQL_delegated_users_table_def
 * @property {number} [id] - NULL=`NO` Key=`PRI` Default=`null` Extra=`auto_increment`
 * @property {number} [user_id] - NULL=`NO` Key=`MUL` Default=`null` Extra=``
 * @property {number} [delegated_user_id] - NULL=`NO` Key=`MUL` Default=`null` Extra=``
 * @property {string} [permissions] - NULL=`YES` Key=`` Default=`edit` Extra=``
 * @property {number} [permission_level_code] - NULL=`YES` Key=`` Default=`1` Extra=``
 * @property {string} [date_created] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_created_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_created_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED`
 * @property {string} [date_updated] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_updated_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_updated_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED on update CURRENT_TIMESTAMP`
 */

/**
 * @typedef {object} MYSQL_invitations_table_def
 * @property {number} [id] - NULL=`NO` Key=`PRI` Default=`null` Extra=`auto_increment`
 * @property {number} [inviting_user_id] - NULL=`NO` Key=`MUL` Default=`null` Extra=``
 * @property {string} [invited_user_email] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [invitation_status] - NULL=`YES` Key=`` Default=`Pending` Extra=``
 * @property {string} [database_access] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [priviledge] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [db_tables_data] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [date_created] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_created_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_created_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED`
 * @property {string} [date_updated] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_updated_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_updated_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED on update CURRENT_TIMESTAMP`
 */

/**
 * @typedef {object} MYSQL_docs_pages_table_def
 * @property {number} [id] - NULL=`NO` Key=`PRI` Default=`null` Extra=`auto_increment`
 * @property {string} [title] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [slug] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [description] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [content] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [text_content] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {number} [level] - NULL=`YES` Key=`` Default=`1` Extra=``
 * @property {number} [page_order] - NULL=`YES` Key=`` Default=`1` Extra=``
 * @property {number} [parent_id] - NULL=`YES` Key=`` Default=`null` Extra=``
 * @property {string} [date_created] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_created_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_created_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED`
 * @property {string} [date_updated] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {number} [date_updated_code] - NULL=`NO` Key=`` Default=`null` Extra=``
 * @property {string} [date_updated_timestamp] - NULL=`YES` Key=`` Default=`CURRENT_TIMESTAMP` Extra=`DEFAULT_GENERATED on update CURRENT_TIMESTAMP`
 */

/**
 * @typedef {object} MYSQL_delegated_user_tables_table_def
 * @property {number} [id]
 * @property {number} [delegated_user_id]
 * @property {number} [root_user_id]
 * @property {string} [database]
 * @property {string} [table]
 * @property {string} [priviledge]
 * @property {string} [date_created]
 * @property {number} [date_created_code]
 * @property {string} [date_created_timestamp]
 * @property {string} [date_updated]
 * @property {number} [date_updated_code]
 * @property {string} [date_updated_timestamp]
 */

// React.Dispatch<React.SetStateAction<any>>
// React.MutableRefObject<HTMLElement | undefined>
// React.MutableRefObject<React.Dispatch<React.SetStateAction<number>>>
// React.LegacyRef<HTMLDivElement | undefined>

// /** @type {HTMLFormElement} */ // @ts-ignore
// const formEl = e.target;

// /** @type {HTMLInputElement} */ // @ts-ignore
// const inputEl = e.target;

// /** @type {HTMLSelectElement} */ // @ts-ignore
// const selectEl = e.target;

/** @type {any} */
/** @type {any} */ // @ts-ignore

// @ts-ignore

// @param {object} params

// /** @type {any} */
// const dbTablesState = React.useState(0);
// /** @type {[ state: any, dispatch: React.Dispatch<React.SetStateAction<any>> ]} */ // @ts-ignore
// const [dbTables, setDbTables] = dbTablesState;

// /** @type {import("@/package-shared/types").AddEntryContextType} */ // @ts-ignore
// const init = {};
// export const AddTableEntryContext = React.createContext(init);
