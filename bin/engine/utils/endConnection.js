// @ts-check

const mysql = require("mysql");

/**
 * @param {mysql.Connection} connection - the active MYSQL connection
 */
module.exports = function endConnection(connection) {
    if (connection.state !== "disconnected") {
        connection.end((err) => {
            console.log(err?.message);
        });
    }
};
