const fs = require("fs");
const { exec } = require("child_process");

require("dotenv").config({ path: "./../.env" });

const sourceFile = process.argv.indexOf("--src") >= 0 ? process.argv[process.argv.indexOf("--src") + 1] : null;
const destinationFile = process.argv.indexOf("--dst") >= 0 ? process.argv[process.argv.indexOf("--dst") + 1] : null;

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

console.log("Running Tailwind CSS compiler ...");

fs.watch("./../", (curr, prev) => {
    exec(`npx tailwindcss -i ./tailwind/main.css -o ./styles/tailwind.css`, (error, stdout, stderr) => {
        if (error) {
            console.log("ERROR =>", error.message);
            return;
        }

        console.log("Tailwind CSS Compilation \x1b[32msuccessful\x1b[0m!");
    });
});
