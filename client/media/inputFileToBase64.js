/**
 * @typedef {{
 *  fileBase64: string,
 *  fileBase64Full: string,
 *  fileName: string,
 *  fileSize: number,
 *  fileType: string,
 * }} FunctionReturn
 */

/**
 * Input File to base64
 * ==============================================================================
 *
 * @description This function takes in a *SINGLE* input file from a HTML file input element.
 * HTML file input elements usually return an array of input objects, so be sure to select the target
 * file from the array.
 *
 * @async
 *
 * @param {object} params - Single object passed
 * @param {object} params.inputFile - HTML input File
 * @param {string} params.inputFile.name - Input File Name
 * @param {number} params.inputFile.size - Input File Size in bytes
 * @param {string} params.inputFile.type - Input File Type: "JPEG", "PNG", "PDF", etc. Whichever allowed regexp is provided
 * @param {RegExp} [params.allowedRegex] - Regexp containing the allowed file types
 *
 * @returns { Promise<FunctionReturn> } - Return Object
 */
module.exports = async function inputFileToBase64({ inputFile, allowedRegex }) {
    /**
     * == Initialize
     *
     * @description Initialize
     */
    const allowedTypesRegex = allowedRegex ? allowedRegex : /image\/*|\/pdf/;

    if (!inputFile?.type?.match(allowedTypesRegex)) {
        window.alert(`We currently don't support ${inputFile.type} file types. Support is coming soon. For now we support only images and PDFs.`);

        return {
            fileBase64: null,
            fileBase64Full: null,
            fileName: inputFile.name,
            fileSize: null,
            fileType: null,
        };
    }

    try {
        /** Process File **/
        let fileName = inputFile.name.replace(/\..*/, "");

        /** Add source to new file **/
        const fileData = await new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(inputFile);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (/** @type {*} */ error) {
                console.log("Error: ", error.message);
            };
        });

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////

        return {
            fileBase64: fileData.replace(/.*?base64,/, ""),
            fileBase64Full: fileData,
            fileName: fileName,
            fileSize: inputFile.size,
            fileType: inputFile.type,
        };

        ////////////////////////////////////////
        ////////////////////////////////////////
        ////////////////////////////////////////
    } catch (/** @type {*} */ error) {
        console.log("File Processing Error! =>", error.message);

        return {
            fileBase64: null,
            fileBase64Full: null,
            fileName: inputFile.name,
            fileSize: null,
            fileType: null,
        };
    }
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
