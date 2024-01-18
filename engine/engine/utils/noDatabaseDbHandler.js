// @ts-check

const fs = require("fs");
const mysql = require("mysql");
const path = require("path");

const SSL_PATH = path.resolve(__dirname, "../../../ssl");

const connection = mysql.createConnection({
    host: process.env.DSQL_HOST,
    user: process.env.DSQL_USER,
    password: process.env.DSQL_PASS,
    charset: "utf8mb4",
    port: process.env.DSQL_PORT?.match(/.../)
        ? parseInt(process.env.DSQL_PORT)
        : undefined,
    timeout: 5000,
    ssl: {
        ca: fs.readFileSync(`${SSL_PATH}/ca-cert.pem`),
    },
});

/**
 * Create database from Schema Function
 * ==============================================================================
 * @param {object} params - Single Param object containing params
 * @param {string} params.query - Query String
 * @param {string[]} [params.values] - Values
 *
 * @returns {Promise<object[] | null>}
 */
module.exports = async function noDatabaseDbHandler({ query, values }) {
    /**
     * Declare variables
     *
     * @description Declare "results" variable
     */
    let results;

    /**
     * Fetch from db
     *
     * @description Fetch data from db if no cache
     */
    try {
        /** ********************* Run Query */
        results = await new Promise((resolve, reject) => {
            if (values) {
                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.log("NO-DB handler error:", error.message);
                        resolve({
                            error: error.message,
                        });
                    } else {
                        resolve(JSON.parse(JSON.stringify(results)));
                    }
                    // setTimeout(() => {
                    //     endConnection(connection);
                    // }, 500);
                });
            } else {
                connection.query(query, (error, results, fields) => {
                    if (error) {
                        console.log("NO-DB handler error:", error.message);
                        resolve({
                            error: error.message,
                        });
                    } else {
                        resolve(JSON.parse(JSON.stringify(results)));
                    }
                    // setTimeout(() => {
                    //     endConnection(connection);
                    // }, 500);
                });
            }
        });
        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log("ERROR in noDatabaseDbHandler =>", error.message);
    }

    /**
     * Return results
     *
     * @description Return results add to cache if "req" param is passed
     */
    if (results) {
        return results;
    } else {
        return null;
    }
};
