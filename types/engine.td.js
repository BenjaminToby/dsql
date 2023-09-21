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
 * @property {{ dbFullName: string }[]} [childrenDatabases] - List of children databases for current database which is parent
 * @property {boolean} [childDatabase] - If current database is a child of a different parent database
 * @property {string} [childDatabaseDbFullName] - Parent database full name => "datasquirel_user_7_new_database"
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_TableSchemaType
 * @property {string} tableName - Table slug (blog_posts)
 * @property {string} tableFullName - Table full name with spaces => "Blog Posts"
 * @property {string} [tableDescription] - Brief description of table
 * @property {DSQL_FieldSchemaType[]} fields - List of table Fields
 * @property {DSQL_IndexSchemaType[]} [indexes] - List of table indexes, if available
 * @property {DSQL_ChildrenTablesType[]} childrenTables - List of children tables
 * @property {boolean} [childTable] -If current table is a child clone
 * @property {string} [childTableName] - Table slug of parent table => "blog_posts"
 * @property {string} [childTableDbFullName] - Database full name(slug) including datasquirel data => "datasquirel_user_7_new_database"
 * @property {string} [tableNameOld] - Old table name, incase of renaming table
 */

/**
 * @typedef {object} DSQL_ChildrenTablesType
 * @property {string} dbNameFull - Database full name(slug) including datasquirel data => "datasquirel_user_7_new_database"
 * @property {string} tableName - Table slug => "blog_posts"
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_FieldSchemaType
 * @property {string} fieldName - Field Name(slug) => "long_description"
 * @property {string} [originName] - Field origin name(optional)
 * @property {boolean} [updatedField] - Has this field been renamed?
 * @property {string} dataType - Field Data type => "BIGIN" | "LONGTEXT" | "VARCHAR(***)" | ...
 * @property {boolean} [nullValue] - Is this a null value or not?
 * @property {boolean} [notNullValue] - Is this NOT a null value?
 * @property {boolean} [primaryKey] - Is this the primary key for table?
 * @property {boolean} [encrypted] - Is this field value encrypted?
 * @property {boolean} [autoIncrement] - Does this table primary key increment automatically?
 * @property {string|number} [defaultValue] - Value of field by default
 * @property {string} [defaultValueLiteral] - SQL key word which generates value automatically => "CURRENT_TIMESTAMP"
 * @property {DSQL_ForeignKeyType} [foreignKey] - Field foreign key reference object
 */

/**
 * @typedef {object} DSQL_ForeignKeyType
 * @property {string} foreignKeyName - Unique Name of foreign key
 * @property {string} destinationTableName - Reference table name(slug) => "blog_posts"
 * @property {string} destinationTableColumnName - Reference column name(slug) => "id"
 * @property {string} destinationTableColumnType - Reference table field type => "BIGINT" | "VARCHAR(***)" | ...
 * @property {boolean} [cascadeDelete] - Does the reference table entry delete when this key is deleted?
 * @property {boolean} [cascadeUpdate] - Does the reference table entry update when this key is updated?
 */

////////////////////////////////////////

/**
 * @typedef {object} DSQL_IndexSchemaType
 * @property {string} indexName - Unique Name of index => "blog_text_index"
 * @property {string} indexType - "regular" or "fullText"
 * @property {DSQL_IndexTableFieldType[]} indexTableFields - List of Index table fields
 */

/**
 * @typedef {object} DSQL_IndexTableFieldType
 * @property {string} value - Table Field Name
 * @property {string} dataType - Table Field data type "VARCHAR(***)" | "BIGINT" | ...
 */

////////////////////////////////////////
