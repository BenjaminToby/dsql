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

console.log("Running Less compiler ...");

const sourceFiles = sourceFile.split(",");
const dstFiles = destinationFile.split(",");

for (let i = 0; i < sourceFiles.length; i++) {
    const srcFolder = sourceFiles[i];
    const dstFile = dstFiles[i];

    fs.watch(srcFolder, { recursive: true }, (evtType, prev) => {
        if (prev?.match(/\(/) || prev?.match(/\.js$/i)) {
            return;
        }

        let finalSrcPath = `${srcFolder}/main.less`;
        let finalDstPath = dstFile;

        if (prev?.match(/\[/)) {
            const paths = prev.split("/");
            const targetPathFull = paths[paths.length - 1];
            const targetPath = targetPathFull.replace(/\[|\]/g, "").replace(/\.less/, "");

            const destinationFileParentFolder = dstFile.replace(/\/[^\/]+\.css$/, "");

            const targetDstFilePath = `${destinationFileParentFolder}/${targetPath}.css`;

            finalSrcPath = `${srcFolder}/${targetPathFull}`;
            finalDstPath = targetDstFilePath;
        }

        exec(`lessc ${finalSrcPath} ${finalDstPath?.match(/\.css$/) ? finalDstPath : finalDstPath.replace(/\/$/, "") + "/_main.css"}`, (error, stdout, stderr) => {
            /** @type {Error} */
            if (error) {
                console.log("ERROR =>", error.message);

                if (!evtType?.match(/change/i) && prev.match(/\[/)) {
                    fs.unlinkSync(finalDstPath);
                }

                return;
            }

            console.log("Less Compilation \x1b[32msuccessful\x1b[0m!");
        });
    });
}
