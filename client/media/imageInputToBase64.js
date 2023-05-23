/**
 * @typedef {{
 *  imageBase64: string,
 *  imageBase64Full: string,
 *  imageName: string,
 * }} FunctionReturn
 */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {{
 *  imageInput: HTMLInputElement,
 *  maxWidth: number,
 *  mimeType: [string='image/jpeg']
 * }} params - Single object passed
 *
 * @returns { Promise<FunctionReturn> } - Return Object
 */
module.exports = async function imageInputToBase64({ imageInput, maxWidth, mimeType }) {
    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    try {
        let imagePreviewNode = document.querySelector(`[data-imagepreview='image']`);
        let imageName = imageInput.files[0].name.replace(/\..*/, "");
        let imageDataBase64;

        const MIME_TYPE = mimeType ? mimeType : "image/jpeg";
        const QUALITY = 0.95;
        const MAX_WIDTH = maxWidth ? maxWidth : null;

        const file = imageInput.files[0]; // get the file
        const blobURL = URL.createObjectURL(file);
        const img = new Image();

        /** ********************* Add source to new image */
        img.src = blobURL;

        imageDataBase64 = await new Promise((res, rej) => {
            /** ********************* Handle Errors in loading image */
            img.onerror = function () {
                URL.revokeObjectURL(this.src);
                window.alert("Cannot load image!");
            };

            /** ********************* Handle new image when loaded */
            img.onload = function () {
                URL.revokeObjectURL(this.src);

                const canvas = document.createElement("canvas");

                if (MAX_WIDTH) {
                    const scaleSize = MAX_WIDTH / img.naturalWidth;

                    canvas.width = img.naturalWidth < MAX_WIDTH ? img.naturalWidth : MAX_WIDTH;
                    canvas.height = img.naturalWidth < MAX_WIDTH ? img.naturalHeight : img.naturalHeight * scaleSize;
                } else {
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                }

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const srcEncoded = canvas.toDataURL(MIME_TYPE, QUALITY);

                if (imagePreviewNode) {
                    document.querySelectorAll(`[data-imagepreview='image']`).forEach((img) => {
                        img.src = srcEncoded;
                    });
                }

                res(srcEncoded);
            };
        });

        return {
            imageBase64: imageDataBase64.replace(/.*?base64,/, ""),
            imageBase64Full: imageDataBase64,
            imageName: imageName,
        };
    } catch (error) {
        console.log("Image Processing Error! =>", error.message);

        return {
            imageBase64: null,
            imageBase64Full: null,
            imageName: null,
        };
    }
};

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
