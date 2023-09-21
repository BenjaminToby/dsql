// @ts-check

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Generate SQL text for Field
 * ==============================================================================
 * @param {object} params - Single object params
 * @param {import("../../../types/database-schema.td").DSQL_FieldSchemaType} params.columnData - Field object
 * @param {boolean} [params.primaryKeySet] - Table Name(slug)
 *
 * @returns {{fieldEntryText: string, newPrimaryKeySet:  boolean}}
 */
module.exports = function generateColumnDescription({ columnData, primaryKeySet }) {
    /**
     * Format tableInfoArray
     *
     * @description Format tableInfoArray
     */
    const { fieldName, dataType, nullValue, primaryKey, autoIncrement, defaultValue, defaultValueLiteral, notNullValue } = columnData;

    let fieldEntryText = "";

    fieldEntryText += `\`${fieldName}\` ${dataType}`;

    ////////////////////////////////////////

    if (nullValue) {
        fieldEntryText += " DEFAULT NULL";
    } else if (defaultValueLiteral) {
        fieldEntryText += ` DEFAULT ${defaultValueLiteral}`;
    } else if (defaultValue) {
        fieldEntryText += ` DEFAULT '${defaultValue}'`;
    } else if (notNullValue) {
        fieldEntryText += ` NOT NULL`;
    }

    ////////////////////////////////////////

    if (primaryKey && !primaryKeySet) {
        fieldEntryText += " PRIMARY KEY";
        primaryKeySet = true;
    }

    ////////////////////////////////////////

    if (autoIncrement) {
        fieldEntryText += " AUTO_INCREMENT";
        primaryKeySet = true;
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return { fieldEntryText, newPrimaryKeySet: primaryKeySet || false };
};

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
