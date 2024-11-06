// @ts-check

const fs = require("fs");

const DSQL_USER_DB_HANDLER = require("./DSQL_USER_DB_HANDLER");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

process.addListener("exit", async (code) => {
    console.log("PROCESS EXITING ...");
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

/**
 * Global function
 * ================================================
 * @description this sets all require global variables. This only runs once.
 */
module.exports = function globalFunction() {
    /**
     * Main Db Handler
     */

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
    /**
     * Main Db Handler
     */

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    /**
     * DSQL user read-only DB handler
     * @param {object} params
     * @param {string} params.paradigm
     * @param {string} params.database
     * @param {string} params.queryString
     * @param {string[]} [params.queryValues]
     */
    DSQL_USER_DB_HANDLER;
};
