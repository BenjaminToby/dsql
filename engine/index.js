/**
 * Imports
 * ===================================
 */
const add = require("./db/add");
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
