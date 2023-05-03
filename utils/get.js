/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const https = require("https");

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
 * @param {String} key - API Key
 * @param {String} db - Database Slug
 * @param {String} query - SQL query
 */
module.exports = async function ({ key, db, query }) {
    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    const httpResponse = await new Promise((resolve, reject) => {
        https
            .request(
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: key,
                    },
                    port: 443,
                    hostname: "datasquirel.com",
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
            )
            .end();
    });

    /** ********************************************** */
    /** ********************************************** */
    /** ********************************************** */

    return httpResponse;
};

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
