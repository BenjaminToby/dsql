#! /usr/bin/env node
// @ts-check

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

require("dotenv").config({
    path: path.resolve(process.cwd(), ".env"),
});

const datasquirel = require("../index");
const createDbFromSchema = require("./engine/createDbFromSchema");
const colors = require("../console-colors");

if (!fs.existsSync(path.resolve(process.cwd(), ".env"))) {
    console.log(".env file not found");
    process.exit();
}

const {
    DSQL_HOST,
    DSQL_USER,
    DSQL_PASS,
    DSQL_DB_NAME,
    DSQL_KEY,
    DSQL_REF_DB_NAME,
    DSQL_FULL_SYNC,
    DSQL_ENCRYPTION_KEY,
    DSQL_ENCRYPTION_SALT,
} = process.env;

if (!DSQL_HOST?.match(/./)) {
    console.log("DSQL_HOST is required in your `.env` file");
    process.exit();
}

if (!DSQL_USER?.match(/./)) {
    console.log("DSQL_USER is required in your `.env` file");
    process.exit();
}

if (!DSQL_PASS?.match(/./)) {
    console.log("DSQL_PASS is required in your `.env` file");
    process.exit();
}

const dbSchemaLocalFilePath = path.resolve(process.cwd(), "dsql.schema.json");

async function run() {
    /** @type {any} */
    let schemaData;

    if (DSQL_KEY && DSQL_REF_DB_NAME?.match(/./)) {
        const dbSchemaDataResponse = await datasquirel.getSchema({
            key: DSQL_KEY,
            database: DSQL_REF_DB_NAME || undefined,
        });

        if (
            !dbSchemaDataResponse.payload ||
            Array.isArray(dbSchemaDataResponse.payload)
        ) {
            console.log(
                "DSQL_KEY+DSQL_REF_DB_NAME => Error in fetching DB schema"
            );
            console.log(dbSchemaDataResponse);
            process.exit();
        }

        /** @type {import("../package-shared/types").DSQL_DatabaseSchemaType} */ // @ts-ignore
        let fetchedDbSchemaObject = dbSchemaDataResponse.payload;
        if (DSQL_DB_NAME) fetchedDbSchemaObject.dbFullName = DSQL_DB_NAME;

        schemaData = [fetchedDbSchemaObject];
    } else if (DSQL_KEY) {
        const dbSchemaDataResponse = await datasquirel.getSchema({
            key: DSQL_KEY,
            database: DSQL_REF_DB_NAME || undefined,
        });

        if (
            !dbSchemaDataResponse.payload ||
            !Array.isArray(dbSchemaDataResponse.payload)
        ) {
            console.log("DSQL_KEY => Error in fetching DB schema");
            console.log(dbSchemaDataResponse);
            process.exit();
        }

        let fetchedDbSchemaObject = dbSchemaDataResponse.payload;
        // fetchedDbSchemaObject.forEach((db, index) => {
        //     db.dbFullName = db.dbFullName?.replace(/^datasquirel_user_\d+_/, "");
        // });

        schemaData = fetchedDbSchemaObject;
    } else if (fs.existsSync(dbSchemaLocalFilePath)) {
        schemaData = [
            JSON.parse(fs.readFileSync(dbSchemaLocalFilePath, "utf8")),
        ];
    } else {
        console.log(
            "No source for DB Schema. Please provide a local `dsql.schema.json` file, or provide `DSQL_KEY` and `DSQL_REF_DB_NAME` environment variables."
        );
        process.exit();
    }

    if (!schemaData) {
        console.log("No schema found");
        process.exit();
    }

    if (DSQL_FULL_SYNC?.match(/true/i)) {
        fs.writeFileSync(
            dbSchemaLocalFilePath,
            JSON.stringify(schemaData[0], null, 4),
            "utf8"
        );
    }

    console.log(
        ` - ${colors.FgBlue}Info:${colors.Reset} Now generating and mapping databases ...`
    );

    // deepcode ignore reDOS: <please specify a reason of ignoring this>
    await createDbFromSchema(schemaData);
    console.log(
        ` - ${colors.FgGreen}Success:${colors.Reset} Databases created Successfully!`
    );
}

// let timeout;

let interval;

if (fs.existsSync(dbSchemaLocalFilePath) && !DSQL_KEY?.match(/....../)) {
    fs.watchFile(dbSchemaLocalFilePath, { interval: 1000 }, (curr, prev) => {
        console.log(
            ` - ${colors.FgBlue}Info:${colors.Reset} Syncing Databases Locally ...`
        );
        run();
    });
} else if (DSQL_KEY?.match(/....../)) {
    interval = setInterval(() => {
        console.log(
            ` - ${colors.FgMagenta}Info:${colors.Reset} Syncing Databases from the cloud ...`
        );
        run();
    }, 20000);
}

run();
