/**
 * Imports
 * ===================================
 */
const addDb = require("./db/addDb");
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
    add: addDb,
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

exports.add = dsqlEngine.db.add;
exports.update = dsqlEngine.db.update;
exports.delete = dsqlEngine.db.delete;
exports.query = dsqlEngine.db.query;
