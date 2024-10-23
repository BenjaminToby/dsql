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
 * @property {number} user_id - User Id
 * @property {string} db_full_name - Database full name => eg. (dataasquirel_user_2_new_database)
 * @property {string} db_name - Database name with spaces => eg. (New Database)
 * @property {string} db_slug - Database slug => eg. (new_database)
 * @property {string} db_image - Database image path
 * @property {string} db_description - Database description
 * @property {number} active_clone - is Database active clone => 0 or 1
 * @property {string} active_clone_parent_db - Database parent db full name => eg. "datasquirel_user_7_wexculture"
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
 * @typedef {object} UserDataPayload
 * @property {string} first_name - First Name *Required
 * @property {string} last_name - Last Name *Required
 * @property {string} email - Email *Required
 * @property {string} password - Password *Required
 * @property {string} username - Username (Optional)
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
 * @property {(Object[]|string)} [payload=[]] - The Y Coordinate
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
