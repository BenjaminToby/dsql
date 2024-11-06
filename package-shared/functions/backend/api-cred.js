// @ts-check

const fs = require("fs");
const decrypt = require("./decrypt");

/** @type {import("../../types").CheckApiCredentialsFn} */
const grabApiCred = ({ key, database, table }) => {
    if (!key) return null;

    try {
        const allowedKeysPath = process.env.DSQL_API_KEYS_PATH;

        if (!allowedKeysPath)
            throw new Error(
                "process.env.DSQL_API_KEYS_PATH variable not found"
            );

        const ApiJSON = decrypt(key);
        /** @type {import("../../types").ApiKeyObject} */
        const ApiObject = JSON.parse(ApiJSON || "");
        const isApiKeyValid = fs.existsSync(
            `${allowedKeysPath}/${ApiObject.sign}`
        );

        if (!isApiKeyValid) return null;
        if (!ApiObject.target_database) return ApiObject;
        if (!database && ApiObject.target_database) return null;
        const isDatabaseAllowed = ApiObject.target_database
            ?.split(",")
            .includes(String(database));

        if (isDatabaseAllowed && !ApiObject.target_table) return ApiObject;
        if (isDatabaseAllowed && !table && ApiObject.target_table) return null;
        const isTableAllowed = ApiObject.target_table
            ?.split(",")
            .includes(String(table));
        if (isTableAllowed) return ApiObject;
        return null;
    } catch (/** @type {any} */ error) {
        console.log(`api-cred ERROR: ${error.message}`);
        return null;
    }
};

module.exports = grabApiCred;
