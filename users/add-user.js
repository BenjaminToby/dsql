// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const https = require("https");
const path = require("path");
const fs = require("fs");
const localAddUser = require("../engine/user/add-user");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * @typedef {object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {(Object[]|string)} [payload=[]] - Payload
 */

/**
 * @typedef {object} UserDataPayload
 * @property {string} first_name - First Name *Required
 * @property {string} last_name - Last Name *Required
 * @property {string} email - Email *Required
 * @property {string} password - Password *Required
 * @property {string?} username - Username (Optional)
 */

/**
 * Add User to Database
 * ==============================================================================
 * @async
 *
 * @param {object} props - Single object passed
 * @param {string} props.key - FULL ACCESS API Key
 * @param {string} props.database - Database Name
 * @param {UserDataPayload} props.payload - User Data Payload
 *
 * @returns { Promise<FunctionReturn> }
 */
async function addUser({ key, payload, database }) {
    /**
     * Check for local DB settings
     *
     * @description Look for local db settings in `.env` file and by pass the http request if available
     */
    const { DSQL_HOST, DSQL_USER, DSQL_PASS, DSQL_DB_NAME, DSQL_KEY, DSQL_REF_DB_NAME, DSQL_FULL_SYNC } = process.env;

    if (DSQL_HOST?.match(/./) && DSQL_USER?.match(/./) && DSQL_PASS?.match(/./) && DSQL_DB_NAME?.match(/./)) {
        /** @type {import("../types/database-schema.td").DSQL_DatabaseSchemaType | undefined} */
        let dbSchema;

        try {
            const localDbSchemaPath = path.resolve(process.cwd(), "dsql.schema.json");
            dbSchema = JSON.parse(fs.readFileSync(localDbSchemaPath, "utf8"));
        } catch (error) {}

        console.log("Reading from local database ...");

        if (dbSchema) {
            return await localAddUser({
                dbSchema: dbSchema,
                payload: payload,
            });
        }
    }

    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        const reqPayload = JSON.stringify({
            payload,
            database,
        });

        const httpsRequest = https.request(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.from(reqPayload).length,
                    Authorization: key,
                },
                port: 443,
                hostname: "datasquirel.com",
                path: `/api/user/add-user`,
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

module.exports = addUser;
