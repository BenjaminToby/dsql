// @ts-check

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////// - Update Table Function - ////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const fs = require("fs");
const path = require("path");

const defaultFieldsRegexp =
    /^id$|^date_created$|^date_created_code$|^date_created_timestamp$|^date_updated$|^date_updated_code$|^date_updated_timestamp$/;

const generateColumnDescription = require("./generateColumnDescription");
const varDatabaseDbHandler = require("./varDatabaseDbHandler");

const schemaPath = path.resolve(process.cwd(), "dsql.schema.json");

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * Update table function
 * ==============================================================================
 * @param {object} params - Single object params
 * @param {string} params.dbFullName - Database full name => "datasquirel_user_4394_db_name"
 * @param {string} params.tableName - Table Name(slug)
 * @param {DSQL_FieldSchemaType[]} params.tableInfoArray - Table Info Array
 * @param {DSQL_DatabaseSchemaType[]} params.dbSchema - Single post
 * @param {DSQL_IndexSchemaType[]} [params.tableIndexes] - Table Indexes
 * @param {boolean} [params.clone] - Is this a newly cloned table?
 * @param {number} [params.tableIndex] - The number index of the table in the dbSchema array
 *
 * @returns {Promise<string|object[]|null>}
 */
module.exports = async function updateTable({
    dbFullName,
    tableName,
    tableInfoArray,
    dbSchema,
    tableIndexes,
    clone,
    tableIndex,
}) {
    /**
     * Initialize
     * ==========================================
     * @description Initial setup
     */

    /**
     * @description Initialize table info array. This value will be
     * changing depending on if a field is renamed or not.
     */
    let upToDateTableFieldsArray = tableInfoArray;

    /**
     * Handle Table updates
     *
     * @description Try to undate table, catch error if anything goes wrong
     */
    try {
        /**
         * @type {string[]}
         * @description Table update query string array
         */
        const updateTableQueryArray = [];

        /**
         * @type {string[]}
         * @description Constriants query string array
         */
        const constraintsQueryArray = [];

        /**
         * @description Push the query initial value
         */
        updateTableQueryArray.push(`ALTER TABLE \`${tableName}\``);

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * @type {DSQL_MYSQL_SHOW_INDEXES_Type[]}
         * @description All indexes from MYSQL db
         */
        const allExistingIndexes = await varDatabaseDbHandler({
            queryString: `SHOW INDEXES FROM \`${tableName}\``,
            database: dbFullName,
        });

        /**
         * @type {DSQL_MYSQL_SHOW_COLUMNS_Type[]}
         * @description All columns from MYSQL db
         */
        const allExistingColumns = await varDatabaseDbHandler({
            queryString: `SHOW COLUMNS FROM \`${tableName}\``,
            database: dbFullName,
        });

        ////////////////////////////////////////

        /**
         * @type {string[]}
         * @description Updated column names Array
         */
        const updatedColumnsArray = [];

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * @description Iterate through every existing column
         */
        if (allExistingColumns)
            for (let e = 0; e < allExistingColumns.length; e++) {
                const { Field } = allExistingColumns[e];

                if (Field.match(defaultFieldsRegexp)) continue;

                /**
                 * @description This finds out whether the fieldName corresponds with the MSQL Field name
                 * if the fildName doesn't match any MYSQL Field name, the field is deleted.
                 */
                let existingEntry = upToDateTableFieldsArray.filter(
                    (column) =>
                        column.fieldName === Field ||
                        column.originName === Field
                );

                if (existingEntry && existingEntry[0]) {
                    /**
                     * @description Check if Field name has been updated
                     */
                    if (existingEntry[0].updatedField) {
                        updatedColumnsArray.push(
                            String(existingEntry[0].fieldName)
                        );

                        const renameColumn = await varDatabaseDbHandler({
                            queryString: `ALTER TABLE ${tableName} RENAME COLUMN \`${existingEntry[0].originName}\` TO \`${existingEntry[0].fieldName}\``,
                            database: dbFullName,
                        });

                        console.log(
                            `Column Renamed from "${existingEntry[0].originName}" to "${existingEntry[0].fieldName}"`
                        );

                        /**
                         * Update Db Schema
                         * ===================================================
                         * @description Update Db Schema after renaming column
                         */
                        try {
                            const userSchemaData = dbSchema;

                            const targetDbIndex = userSchemaData.findIndex(
                                (db) => db.dbFullName === dbFullName
                            );
                            const targetTableIndex = userSchemaData[
                                targetDbIndex
                            ].tables.findIndex(
                                (table) => table.tableName === tableName
                            );
                            const targetFieldIndex = userSchemaData[
                                targetDbIndex
                            ].tables[targetTableIndex].fields.findIndex(
                                (field) =>
                                    field.fieldName ===
                                    existingEntry[0].fieldName
                            );

                            delete userSchemaData[targetDbIndex].tables[
                                targetTableIndex
                            ].fields[targetFieldIndex]["originName"];
                            delete userSchemaData[targetDbIndex].tables[
                                targetTableIndex
                            ].fields[targetFieldIndex]["updatedField"];

                            /**
                             * @description Set New Table Fields Array
                             */
                            upToDateTableFieldsArray =
                                userSchemaData[targetDbIndex].tables[
                                    targetTableIndex
                                ].fields;

                            fs.writeFileSync(
                                schemaPath,
                                JSON.stringify(userSchemaData),
                                "utf8"
                            );
                        } catch (/** @type {*} */ error) {
                            console.log(
                                "Error in updating Table =>",
                                error.message
                            );
                        }

                        ////////////////////////////////////////
                    }

                    ////////////////////////////////////////

                    continue;

                    ////////////////////////////////////////
                } else {
                    // console.log("Column Deleted =>", Field);
                    await varDatabaseDbHandler({
                        queryString: `ALTER TABLE ${tableName} DROP COLUMN \`${Field}\``,
                        database: dbFullName,
                    });
                }
            }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * Handle MYSQL Table Indexes
         * ===================================================
         * @description Iterate through each table index(if available)
         * and perform operations
         */
        if (allExistingIndexes)
            for (let f = 0; f < allExistingIndexes.length; f++) {
                const { Key_name, Index_comment } = allExistingIndexes[f];

                /**
                 * @description Check if this index was specifically created
                 * by datasquirel
                 */
                if (Index_comment?.match(/schema_index/)) {
                    try {
                        const existingKeyInSchema = tableIndexes
                            ? tableIndexes.filter(
                                  (indexObject) =>
                                      indexObject.alias === Key_name
                              )
                            : null;
                        if (!existingKeyInSchema?.[0])
                            throw new Error(
                                `This Index(${Key_name}) Has been Deleted!`
                            );
                    } catch (error) {
                        /**
                         * @description Drop Index: This happens when the MYSQL index is not
                         * present in the datasquirel DB schema
                         */
                        await varDatabaseDbHandler({
                            queryString: `ALTER TABLE ${tableName} DROP INDEX \`${Key_name}\``,
                            database: dbFullName,
                        });
                    }
                }
            }

        /**
         * Handle DATASQUIREL Table Indexes
         * ===================================================
         * @description Iterate through each datasquirel schema
         * table index(if available), and perform operations
         */
        if (tableIndexes && tableIndexes[0]) {
            for (let g = 0; g < tableIndexes.length; g++) {
                const { indexType, indexName, indexTableFields, alias } =
                    tableIndexes[g];

                if (!alias?.match(/./)) continue;

                /**
                 * @description Check for existing Index in MYSQL db
                 */
                try {
                    const existingKeyInDb = allExistingIndexes?.filter(
                        (/** @type {any} */ indexObject) =>
                            indexObject.Key_name === alias
                    );
                    if (!existingKeyInDb?.[0])
                        throw new Error("This Index Does not Exist");
                } catch (error) {
                    /**
                     * @description Create new index if determined that it
                     * doesn't exist in MYSQL db
                     */
                    await varDatabaseDbHandler({
                        queryString: `CREATE${
                            indexType?.match(/fullText/i) ? " FULLTEXT" : ""
                        } INDEX \`${alias}\` ON ${tableName}(${indexTableFields
                            ?.map((nm) => nm.value)
                            .map((nm) => `\`${nm}\``)
                            .join(",")}) COMMENT 'schema_index'`,
                        database: dbFullName,
                    });
                }
            }
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * Handle MYSQL Foreign Keys
         * ===================================================
         * @description Iterate through each datasquirel schema
         * table index(if available), and perform operations
         */

        /**
         *  @description All MSQL Foreign Keys
         * @type {*}
         */
        const allForeignKeys = await varDatabaseDbHandler({
            queryString: `SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = '${dbFullName}' AND TABLE_NAME='${tableName}' AND CONSTRAINT_TYPE='FOREIGN KEY'`,
            database: dbFullName,
        });

        if (allForeignKeys)
            for (let c = 0; c < allForeignKeys.length; c++) {
                const { CONSTRAINT_NAME } = allForeignKeys[c];

                /**
                 *  @description Skip if Key is the PRIMARY Key
                 */
                if (CONSTRAINT_NAME.match(/PRIMARY/)) continue;

                /**
                 *  @description Drop all foreign Keys to avoid MYSQL errors when adding/updating
                 * Foreign keys
                 */
                const dropForeignKey = await varDatabaseDbHandler({
                    queryString: `ALTER TABLE ${tableName} DROP FOREIGN KEY \`${CONSTRAINT_NAME}\``,
                    database: dbFullName,
                });
            }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        /**
         * Handle DATASQUIREL schema fields for current table
         * ===================================================
         * @description Iterate through each field object and
         * perform operations
         */
        for (let i = 0; i < upToDateTableFieldsArray.length; i++) {
            const column = upToDateTableFieldsArray[i];
            const prevColumn = upToDateTableFieldsArray[i - 1];
            const nextColumn = upToDateTableFieldsArray[i + 1];

            const {
                fieldName,
                dataType,
                nullValue,
                primaryKey,
                autoIncrement,
                defaultValue,
                defaultValueLiteral,
                foreignKey,
                updatedField,
            } = column;

            ////////////////////////////////////////

            /**
             * @description Skip default fields
             */
            if (fieldName?.match(/^id$|^date_/)) continue;
            /**
             * @description Skip columns that have been updated recently
             */
            // if (updatedColumnsArray.includes(fieldName)) continue;

            ////////////////////////////////////////

            let updateText = "";

            ////////////////////////////////////////

            let existingColumnIndex;

            /**
             * @description Existing MYSQL field object
             */
            let existingColumn =
                allExistingColumns && allExistingColumns[0]
                    ? allExistingColumns.filter((_column, _index) => {
                          if (_column.Field === fieldName) {
                              existingColumnIndex = _index;
                              return true;
                          }
                      })
                    : null;

            /**
             * @description Construct SQL text snippet for this field
             */
            let { fieldEntryText } = generateColumnDescription({
                columnData: column,
            });

            /**
             * @description Modify Column(Field) if it already exists
             * in MYSQL database
             */
            if (existingColumn && existingColumn[0]?.Field) {
                const { Field, Type, Null, Key, Default, Extra } =
                    existingColumn[0];

                let isColumnReordered = existingColumnIndex
                    ? i < existingColumnIndex
                    : false;

                if (
                    Field === fieldName &&
                    !isColumnReordered &&
                    dataType?.toUpperCase() === Type.toUpperCase()
                ) {
                    updateText += `MODIFY COLUMN ${fieldEntryText}`;
                    // continue;
                } else {
                    updateText += `MODIFY COLUMN ${fieldEntryText}${
                        isColumnReordered
                            ? prevColumn?.fieldName
                                ? " AFTER `" + prevColumn.fieldName + "`"
                                : " AFTER `id`"
                            : ""
                    }`;
                    // if (userId) {
                    // } else {
                    //     updateText += `MODIFY COLUMN ${fieldEntryText}`;
                    // }
                }
            } else if (prevColumn && prevColumn.fieldName) {
                /**
                 * @description Add new Column AFTER previous column, if
                 * previous column exists
                 */
                updateText += `ADD COLUMN ${fieldEntryText} AFTER \`${prevColumn.fieldName}\``;
            } else if (!prevColumn && nextColumn && nextColumn.fieldName) {
                /**
                 * @description Add new Column before next column, if
                 * next column exists
                 */
                updateText += `ADD COLUMN ${fieldEntryText} AFTER \`id\``;
            } else {
                /**
                 * @description Append new column to the end of existing columns
                 */
                updateText += `ADD COLUMN ${fieldEntryText}`;
            }

            ////////////////////////////////////////

            /**
             * @description Pust SQL code snippet to updateTableQueryArray Array
             * Add a comma(,) to separate from the next snippet
             */
            updateTableQueryArray.push(updateText + ",");

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////

            /**
             * @description Handle foreing keys if available, and if there is no
             * "clone" boolean = true
             */
            if (!clone && foreignKey) {
                const {
                    destinationTableName,
                    destinationTableColumnName,
                    cascadeDelete,
                    cascadeUpdate,
                    foreignKeyName,
                } = foreignKey;

                const foreinKeyText = `ADD CONSTRAINT \`${foreignKeyName}\` FOREIGN KEY (${fieldName}) REFERENCES ${destinationTableName}(${destinationTableColumnName})${
                    cascadeDelete ? " ON DELETE CASCADE" : ""
                }${cascadeUpdate ? " ON UPDATE CASCADE" : ""}`;
                // const foreinKeyText = `ADD CONSTRAINT \`${foreignKeyName}\` FOREIGN KEY (${fieldName}) REFERENCES ${destinationTableName}(${destinationTableColumnName})${cascadeDelete ? " ON DELETE CASCADE" : ""}${cascadeUpdate ? " ON UPDATE CASCADE" : ""}` + ",";

                const finalQueryString = `ALTER TABLE \`${tableName}\` ${foreinKeyText}`;

                const addForeignKey = await varDatabaseDbHandler({
                    database: dbFullName,
                    queryString: finalQueryString,
                });
            }

            ////////////////////////////////////////
        }

        /**
         * @description Construct final SQL query by combning all SQL snippets in
         * updateTableQueryArray Arry, and trimming the final comma(,)
         */
        const updateTableQuery = updateTableQueryArray
            .join(" ")
            .replace(/,$/, "");

        ////////////////////////////////////////

        /**
         * @description Check if SQL snippets array has more than 1 entries
         * This is because 1 entry means "ALTER TABLE table_name" only, without any
         * Alter directives like "ADD COLUMN" or "MODIFY COLUMN"
         */
        if (updateTableQueryArray.length > 1) {
            const updateTable = await varDatabaseDbHandler({
                queryString: updateTableQuery,
                database: dbFullName,
            });

            return updateTable;
        } else {
            /**
             * @description If only 1 SQL snippet is left in updateTableQueryArray, this
             * means that no updates have been made to the table
             */
            return "No Changes Made to Table";
        }

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log('Error in "updateTable" function =>', error.message);

        return "Error in Updating Table";
    }
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
