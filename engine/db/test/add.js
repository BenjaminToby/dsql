const fs = require("fs");
const dbHandler = require("../dbHandler");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * Add Database Entry
 * ==============================================================================
 * @param {object} params - foundUser if any
 * @param {string} params.tableName - Table Name
 * @param {object} params.data - Data to be added
 * @param {string?} params.duplicateColumnName - Duplicate Column Name
 * @param {string | number?} params.duplicateColumnValue - Duplicate Column Value
 *
 * @returns {object}
 */
async function addDbEntry({ tableName, data, duplicateColumnName, duplicateColumnValue }) {
    /**
     * Check Duplicate if specified
     *
     * @description Check Duplicate if specified
     */
    if (duplicateColumnName) {
        let duplicateEntry = await dbHandler(`SELECT ${duplicateColumnName} FROM ${tableName} WHERE ${duplicateColumnName}='${duplicateColumnValue}'`);

        if (duplicateEntry && duplicateEntry[0]) return null;
    }

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    const dataKeys = Object.keys(data);

    let insertKeysArray = [];
    let insertValuesArray = [];

    for (let i = 0; i < dataKeys.length; i++) {
        const dataKey = dataKeys[i];
        let dataValue = data[dataKey];
        // const correspondingColumnObject = dbColumns.filter((col) => col.Field === dataKey);
        // const { Field, Type, Null, Key, Default, Extra } = correspondingColumnObject;

        if (!dataValue) continue;

        insertKeysArray.push("`" + dataKey + "`");

        if (typeof dataValue === "object") {
            dataValue = JSON.stringify(data[dataKey]);
        }

        // let parsedDataValue = dataValue.toString().replace(/\'/g, "\\'");

        insertValuesArray.push(dataValue);
    }

    /** ********************************************** */

    let existingDateCreatedColumn = await dbHandler(`SHOW COLUMNS FROM \`${tableName}\` WHERE Field = 'date_created'`);
    if (!existingDateCreatedColumn || !existingDateCreatedColumn[0]) {
        await dbHandler(`ALTER TABLE ${tableName} ADD COLUMN date_created VARCHAR(255) NOT NULL`);
    }

    insertKeysArray.push("date_created");
    insertValuesArray.push(Date());

    /** ********************************************** */

    let existingDateCreatedCodeColumn = await dbHandler(`SHOW COLUMNS FROM ${tableName} WHERE Field = 'date_created_code'`);
    if (!existingDateCreatedCodeColumn || !existingDateCreatedCodeColumn[0]) {
        await dbHandler(`ALTER TABLE ${tableName} ADD COLUMN date_created_code BIGINT NOT NULL`);
    }

    insertKeysArray.push("date_created_code");
    insertValuesArray.push(Date.now());

    /** ********************************************** */

    let existingDateCodeColumn = await dbHandler(`SHOW COLUMNS FROM ${tableName} WHERE Field = 'date_code'`);
    if (existingDateCodeColumn && existingDateCodeColumn[0]) {
        insertKeysArray.push("date_code");
        insertValuesArray.push(Date.now());
    }

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    let existingDateUpdatedColumn = await dbHandler(`SHOW COLUMNS FROM ${tableName} WHERE Field = 'date_updated'`);
    if (!existingDateUpdatedColumn || !existingDateUpdatedColumn[0]) {
        await dbHandler(`ALTER TABLE ${tableName} ADD COLUMN date_updated VARCHAR(255) NOT NULL`);
    }

    insertKeysArray.push("date_updated");
    insertValuesArray.push(Date());

    /** ********************************************** */

    let existingDateUpdatedCodeColumn = await dbHandler(`SHOW COLUMNS FROM ${tableName} WHERE Field = 'date_updated_code'`);
    if (!existingDateUpdatedCodeColumn || !existingDateUpdatedCodeColumn[0]) {
        await dbHandler(`ALTER TABLE ${tableName} ADD COLUMN date_updated_code BIGINT NOT NULL`);
    }

    insertKeysArray.push("date_updated_code");
    insertValuesArray.push(Date.now());

    /** ********************************************** */

    const query = `INSERT INTO ${tableName} (${insertKeysArray.join(",")}) VALUES (${insertValuesArray.map((val) => "?").join(",")})`;
    const queryValuesArray = insertValuesArray;

    const newInsert = await dbHandler(query, queryValuesArray);

    /** ********************************************** */

    return newInsert;

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */
}
