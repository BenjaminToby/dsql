////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * Sanitize SQL function
 * ==============================================================================
 * @description this function takes in a text(or number) and returns a sanitized
 * text, usually without spaces
 *
 * @param {string|number|object} text - Text or number or object
 * @param {boolean?} spaces - Allow spaces
 * @param {RegExp?} regex - Regular expression, removes any match
 *
 * @returns {string|object}
 */
function sanitizeSql(text, spaces, regex) {
    /**
     * Initial Checks
     *
     * @description Initial Checks
     */
    if (!text) return "";
    if (typeof text == "number" || typeof text == "boolean") return text;
    if (typeof text == "string" && !text?.toString()?.match(/./)) return "";

    if (typeof text == "object" && !Array.isArray(text)) {
        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        const newObject = sanitizeObjects(text, spaces);
        return newObject;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } else if (typeof text == "object" && Array.isArray(text)) {
        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        const newArray = sanitizeArrays(text, spaces);
        return newArray;

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    }

    // if (text?.toString()?.match(/\'|\"/)) {
    //     console.log("TEXT containing commas =>", text);
    //     return "";
    // }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let finalText = text;

    if (regex) {
        finalText = text.toString().replace(regex, "");
    }

    if (spaces) {
    } else {
        finalText = text
            .toString()
            .replace(/\n|\r|\n\r|\r\n/g, "")
            .replace(/ /g, "");
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    const escapeRegex = /select |insert |drop |delete |alter |create |exec | union | or | like | concat|LOAD_FILE|ASCII| COLLATE | HAVING | information_schema|DECLARE |\#|WAITFOR |delay |BENCHMARK |\/\*.*\*\//gi;

    finalText = finalText
        .replace(/(?<!\\)\'/g, "\\'")
        .replace(/(?<!\\)\`/g, "\\`")
        // .replace(/(?<!\\)\"/g, '\\"')
        .replace(/\/\*\*\//g, "")
        .replace(escapeRegex, "\\$&");

    // const injectionRegexp = /select .* from|\*|delete from|drop database|drop table|update .* set/i;

    // if (text?.toString()?.match(injectionRegexp)) {
    //     console.log("ATTEMPTED INJECTION =>", text);
    //     return "";
    // }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return finalText;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * Sanitize Objects Function
 * ==============================================================================
 * @description Sanitize objects in the form { key: "value" }
 *
 * @param {object} object - Database Full Name
 * @param {boolean?} spaces - Allow spaces
 *
 * @returns {object}
 */
function sanitizeObjects(object, spaces) {
    let objectUpdated = { ...object };
    const keys = Object.keys(objectUpdated);

    keys.forEach((key) => {
        const value = objectUpdated[key];

        if (!value) {
            delete objectUpdated[key];
            return;
        }

        if (typeof value == "string" || typeof value == "number") {
            objectUpdated[key] = sanitizeSql(value, spaces);
        } else if (typeof value == "object" && !Array.isArray(value)) {
            objectUpdated[key] = sanitizeObjects(value, spaces);
        } else if (typeof value == "object" && Array.isArray(value)) {
            objectUpdated[key] = sanitizeArrays(value, spaces);
        }
    });

    return objectUpdated;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/**
 * Sanitize Objects Function
 * ==============================================================================
 * @description Sanitize objects in the form { key: "value" }
 *
 * @param {string[]|number[]|object[]} array - Database Full Name
 * @param {boolean?} spaces - Allow spaces
 *
 * @returns {string[]|number[]|object[]}
 */
function sanitizeArrays(array, spaces) {
    let arrayUpdated = [...array];

    arrayUpdated.forEach((item, index) => {
        const value = item;

        if (!value) {
            arrayUpdated.splice(index, 1);
            return;
        }

        if (typeof item == "string" || typeof item == "number") {
            arrayUpdated[index] = sanitizeSql(value, spaces);
        } else if (typeof item == "object" && !Array.isArray(value)) {
            arrayUpdated[index] = sanitizeObjects(value, spaces);
        } else if (typeof item == "object" && Array.isArray(value)) {
            arrayUpdated[index] = sanitizeArrays(item, spaces);
        }
    });

    return arrayUpdated;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

module.exports = sanitizeSql;
