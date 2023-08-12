require("dotenv").config({ path: "./../.env" });

////////////////////////////////////////

const noDatabaseDbHandler = require("../functions/backend/noDatabaseDbHandler");
const serverError = require("../functions/backend/serverError");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

async function createDbFromSchema({ userId }) {
    /**
     * Grab Schema
     *
     * @description Grab Schema
     */
    try {
        const allDatabases = await noDatabaseDbHandler(`SHOW DATABASES`);

        const datasquirelUserDatabases = allDatabases.filter((database) => database.Database.match(/datasquirel_user_/));

        for (let i = 0; i < datasquirelUserDatabases.length; i++) {
            const datasquirelUserDatabase = datasquirelUserDatabases[i];
            const { Database } = datasquirelUserDatabase;

            const grantDbPriviledges = await noDatabaseDbHandler(`GRANT ALL PRIVILEGES ON ${Database}.* TO 'datasquirel_full_access'@'127.0.0.1' WITH GRANT OPTION`);

            console.log(grantDbPriviledges);
        }

        const flushPriviledged = await noDatabaseDbHandler(`FLUSH PRIVILEGES`);
    } catch (error) {
        serverError({
            component: "shell/grantDbPriviledges/main-catch-error",
            message: error.message,
            user: { id: userId },
        });
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    process.exit();

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
}

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

const userArg = process.argv[process.argv.indexOf("--user")];
const externalUser = process.argv[process.argv.indexOf("--user") + 1];

createDbFromSchema({ userId: userArg ? externalUser : null });
