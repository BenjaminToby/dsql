// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");
const getLocalUser = require("../engine/user/get-user");
const grabHostNames = require("../package-shared/utils/grab-host-names");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {object} params - Single Param object containing params
 * @param {String} params.key - API Key
 * @param {String} params.database - Target Database
 * @param {number} params.userId - user id
 * @param {string[]} [params.fields] - fields to select
 *
 * @returns { Promise<import("../package-shared/types").GetUserFunctionReturn>}
 */
async function getUser({ key, userId, database, fields }) {
    /**
     * Initialize
     */
    const defaultFields = [
        "id",
        "first_name",
        "last_name",
        "email",
        "username",
        "image",
        "image_thumbnail",
        "verification_status",
        "date_created",
        "date_created_code",
        "date_created_timestamp",
        "date_updated",
        "date_updated_code",
        "date_updated_timestamp",
    ];

    const updatedFields =
        fields && fields[0] ? [...defaultFields, ...fields] : defaultFields;

    const reqPayload = JSON.stringify({
        userId,
        database,
        fields: [...new Set(updatedFields)],
    });

    const { host, port, scheme } = grabHostNames();

    /**
     * Check for local DB settings
     *
     * @description Look for local db settings in `.env` file and by pass the http request if available
     */
    const {
        DSQL_HOST,
        DSQL_USER,
        DSQL_PASS,
        DSQL_DB_NAME,
        DSQL_KEY,
        DSQL_REF_DB_NAME,
        DSQL_FULL_SYNC,
    } = process.env;

    if (
        DSQL_HOST?.match(/./) &&
        DSQL_USER?.match(/./) &&
        DSQL_PASS?.match(/./) &&
        DSQL_DB_NAME?.match(/./)
    ) {
        /** @type {import("../package-shared/types").DSQL_DatabaseSchemaType | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(
                process.cwd(),
                "dsql.schema.json"
            );
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        if (dbSchema) {
            return await getLocalUser({
                userId,
                fields: [...new Set(updatedFields)],
                dbSchema,
            });
        }
    }

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        const httpsRequest = scheme.request(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.from(reqPayload).length,
                    Authorization: key,
                },
                port,
                hostname: host,
                path: `/api/user/get-user`,
            },

            /**
             * Callback Function
             *
             * @description https request callback
             */
            (response) => {
                var str = "";

                response.on("data", function (chunk) {
                    str += chunk;
                });

                response.on("end", function () {
                    resolve(JSON.parse(str));
                });

                response.on("error", (err) => {
                    reject(err);
                });
            }
        );

        httpsRequest.write(reqPayload);
        httpsRequest.end();
    });

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    return httpResponse;
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */

module.exports = getUser;
