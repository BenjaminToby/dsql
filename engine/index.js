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
    addDb: addDb,
    updateDb: update,
    deleteDb: deleteDb,
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

exports.addDb = dsqlEngine.db.addDb;
exports.updateDb = dsqlEngine.db.updateDb;
exports.deleteDb = dsqlEngine.db.deleteDb;
exports.query = dsqlEngine.db.query;
