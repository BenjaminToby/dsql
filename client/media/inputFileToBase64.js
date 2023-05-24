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
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {{
 *  inputFile: {
 *      name: string,
 *      size: number,
 *      type: string,
 *  },
 * }} params - Single object passed
 *
 * @description This function takes in a *SINGLE* input file from a HTML file input element.
 * HTML file input elements usually return an array of input objects, so be sure to select the target
 * file from the array.
 *
 * @returns { Promise<FunctionReturn> } - Return Object
 */
module.exports = async function inputFileToBase64({ inputFile }) {
    /**
     * == Initialize
     *
     * @description Initialize
     */
    const allowedTypesRegex = /image\/*|\/pdf/;

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
        /**
         * == Process File
         */
        let fileName = inputFile.name.replace(/\..*/, "");

        /** Add source to new file **/
        const fileData = await new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(inputFile);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                console.log("Error: ", error.message);
            };
        });

        return {
            fileBase64: fileData.replace(/.*?base64,/, ""),
            fileBase64Full: fileData,
            fileName: fileName,
            fileSize: inputFile.size,
            fileType: inputFile.type,
        };
    } catch (error) {
        console.log("Image Processing Error! =>", error.message);

        return {
            fileBase64: null,
            fileBase64Full: null,
            fileName: inputFile.name,
            fileSize: null,
            fileType: null,
        };
    }
};

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
