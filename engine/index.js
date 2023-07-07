/**
 * Imports
 * ===================================
 */
const add = require("./db/add");
const query = require("./db/query");
const update = require("./db/updateDb");
const deleteDb = require("./db/deleteDb");

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
    delete: deleteDb,
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