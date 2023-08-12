require("dotenv").config({ path: "./../.env" });

const dbEngine = require("datasquirel/engine");
const http = require("http");

const datasquirel = require("datasquirel");

`curl http://www.dataden.tech`;

datasquirel
    .get({
        db: "test",
        key: process.env.DATASQUIREL_READ_ONLY_KEY,
        query: "SELECT title, slug, body FROM blog_posts",
    })
    .then((response) => {
        console.log(response);
    });

// dbEngine.db
//     .query({
//         dbFullName: "datasquirel",
//         dbHost: process.env.DB_HOST,
//         dbPassword: process.env.DB_PASSWORD,
//         dbUsername: process.env.DB_USERNAME,
//         query: "SHOW TABLES",
//     })
//     .then((res) => {
//         console.log("res =>", res);
//     });

// run({
//     key: "bc057a2cd57922e085739c89b4985e5e676b655d7cc0ba7604659cad0a08c252040120c06597a5d22959a502a44bd816",
//     db: "showmerebates",
//     query: "SELECT * FROM test_table",
// }).then((res) => {
//     console.log("res =>", res);
// });

post({
    key: "3115fce7ea7772eda75f8f0e55a1414c5c018b4920f4bc99a2d4d7000bac203c15a7036fd3d7ef55ae67a002d4c757895b5c58ff82079a04ba6d42d23d4353256985090959a58a9af8e03cb277fc7895413e6f28ae11b1cc15329c7f94cdcf9a795f54d6e1d319adc287dc147143e62d",
    database: "showmerebates",
    query: {
        action: "delete",
        table: "test_table",
        identifierColumnName: "id",
        identifierValue: 6,
    },
}).then((res) => {
    console.log("res =>", res);
});

async function run({ key, db, query }) {
    const httpResponse = await new Promise((resolve, reject) => {
        http.request(
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: key,
                },
                hostname: "localhost",
                port: 7070,
                path: `/api/query/get?db=${db}&query=${query
                    .replace(/\n|\r|\n\r/g, "")
                    .replace(/ {2,}/g, " ")
                    .replace(/ /g, "+")}`,
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
        ).end();
    });

    return httpResponse;
}

/**
 * @typedef {Object} PostReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {(Object[]|string)} [payload=[]] - The Y Coordinate
 */

/**
 * @typedef {object} PostDataPayload
 * @property {string} action - "insert" | "update" | "delete"
 * @property {string} table - Table name(slug) eg "blog_posts"
 * @property {string} identifierColumnName - Table identifier field name => eg. "id" OR "email"
 * @property {string} identifierValue - Corresponding value of the selected field name => This
 * checks identifies a the target row for "update" or "delete". Not needed for "insert"
 * @property {object} data - Table insert payload object => This must have keys that match
 * table fields
 * @property {string?} duplicateColumnName - Duplicate column name to check for
 * @property {string?} duplicateColumnValue - Duplicate column value to match. If no "update" param
 * provided, function will return null
 * @property {boolean?} update - Should the "insert" action update the existing entry if indeed
 * the entry with "duplicateColumnValue" exists?
 */

/**
 * Post request
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single object passed
 * @param {string} params.key - FULL ACCESS API Key
 * @param {string} params.database - Database Name
 * @param {PostDataPayload} params.query - SQL query String or Request Object
 *
 * @returns { Promise<PostReturn> } - Return Object
 */
async function post({ key, query, database }) {
    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        const reqPayloadString = JSON.stringify({
            query,
            database,
        }).replace(/\n|\r|\n\r/gm, "");

        try {
            JSON.parse(reqPayloadString);
        } catch (error) {
            console.log(error);
            console.log(reqPayloadString);

            return {
                success: false,
                payload: null,
                error: "Query object is invalid. Please Check query data values",
            };
        }

        const reqPayload = reqPayloadString;

        const httpsRequest = http.request(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.from(reqPayload).length,
                    Authorization: key,
                },
                hostname: "localhost",
                port: 7070,
                path: `/api/query/post`,
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
                    try {
                        resolve(JSON.parse(str));
                    } catch (error) {
                        console.log(error.message);
                        console.log("Fetched Payload =>", str);

                        resolve({
                            success: false,
                            payload: null,
                            error: error.message,
                        });
                    }
                });

                response.on("error", (err) => {
                    resolve({
                        success: false,
                        payload: null,
                        error: err.message,
                    });
                });
            }
        );

        httpsRequest.write(reqPayload);

        httpsRequest.on("error", (error) => {
            console.log("HTTPS request ERROR =>", error);
        });

        httpsRequest.end();
    });

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    return httpResponse;
}
