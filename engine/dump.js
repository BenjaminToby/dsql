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

const dbName = process.env.DSQL_DB_NAME || "";
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

try {
    let execSyncOptions = {
        cwd: process.cwd(),
    };

    if (process.platform.match(/win/i)) execSyncOptions.shell = "bash.exe";

    const dump = execSync(`${mysqlPath} -u ${process.env.DB_USERNAME} -p${process.env.DB_PASSWORD} ${dbName} < ${dumpFilePath}`, execSyncOptions);

    console.log("Dumped successfully", dump.toString());

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
} catch (error) {
    console.log("Dump Error: ", error.message);
}
