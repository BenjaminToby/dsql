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

////////////////////////////////////////
