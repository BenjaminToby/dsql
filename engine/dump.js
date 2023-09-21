#! /usr/bin/env node
// @ts-check

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

require("dotenv").config({
    path: path.resolve(process.cwd(), ".env"),
});

const mysqlPath = process.platform?.match(/win/i) ? "'" + "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe" + "'" : "mysql";
const mysqlDumpPath = process.platform?.match(/win/i) ? "'" + "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe" + "'" : "mysqldump";

const { DSQL_HOST, DSQL_USER, DSQL_PASS, DSQL_DB_NAME, DSQL_KEY, DSQL_REF_DB_NAME, DSQL_FULL_SYNC, DSQL_ENCRYPTION_KEY, DSQL_ENCRYPTION_SALT } = process.env;

const dbName = DSQL_DB_NAME || "";
const dumpFilePathArg = process.argv.indexOf("--file");

if (dumpFilePathArg < 0) {
    console.log("Please provide a dump file path using `--file` argument");
    process.exit();
}

const dumpFilePath = process.argv[dumpFilePathArg + 1];

if (!dbName?.match(/./)) {
    console.log("DSQL_DB_NAME is required in your `.env` file");
    process.exit();
}

if (!DSQL_USER?.match(/./) || !DSQL_PASS?.match(/./)) {
    console.log("DSQL_USER and DSQL_PASS are required in your `.env` file");
    process.exit();
}

try {
    let execSyncOptions = {
        cwd: process.cwd(),
    };

    if (process.platform.match(/win/i)) execSyncOptions.shell = "bash.exe";

    const dump = execSync(`${mysqlPath} -u ${DSQL_USER} -p${DSQL_PASS} ${dbName} < ${dumpFilePath}`, execSyncOptions);

    console.log("Dumped successfully", dump.toString());

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
} catch (/** @type {*} */ error) {
    console.log("Dump Error: ", error.message);
}
