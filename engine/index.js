/**
 * Imports
 * ===================================
 */
const add = require("./db/add");
const query = require("./db/query");
const update = require("./db/update");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

/**
 * Media Functions Object
 * ===================================
 */
const db = {
    add: add,
    update: update,
    delete: update,
    query: query,
};

/**
 * Main Export
 * ===================================
 */
const dsqlEngine = {
    db: db,
};

module.exports = dsqlEngine;

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
