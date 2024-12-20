// @ts-check

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 *
 * @param {object} param0
 * @param {import("../../../package-shared/types").DSQL_FieldSchemaType[]} param0.tableInfoArray
 * @returns
 */
module.exports = function supplementTable({ tableInfoArray }) {
    /**
     * Format tableInfoArray
     *
     * @description Format tableInfoArray
     */
    let finalTableArray = tableInfoArray;
    const defaultFields = require("../data/defaultFields.json");

    ////////////////////////////////////////

    let primaryKeyExists = finalTableArray.filter(
        (_field) => _field.primaryKey
    );

    ////////////////////////////////////////

    defaultFields.forEach((field) => {
        let fieldExists = finalTableArray.filter(
            (_field) => _field.fieldName === field.fieldName
        );

        if (fieldExists && fieldExists[0]) {
            return;
        } else if (field.fieldName === "id" && !primaryKeyExists[0]) {
            finalTableArray.unshift(field);
        } else {
            finalTableArray.push(field);
        }
    });

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return finalTableArray;
};

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
