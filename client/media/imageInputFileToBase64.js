/**
 * @typedef {{
 *  imageBase64: string,
 *  imageBase64Full: string,
 *  imageName: string,
 *  imageSize: number,
 * }} FunctionReturn
 */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {{
 *  imageInputFile: { name:string },
 *  maxWidth: number,
 *  imagePreviewNode: HTMLImageElement,
 * }} params - Single object passed
 *
 * @returns { Promise<FunctionReturn> } - Return Object
 */
export default async function imageInputFileToBase64({ imageInputFile, maxWidth, imagePreviewNode }) {
    /**
     * Make https request
     *
     * @description make a request to datasquirel.com
     */
    console.log(typeof imageInputFile);

    let imageName = imageInputFile.name.replace(/\..*/, "");
    let imageDataBase64;
    let imageSize;
    let canvas = document.createElement("canvas");

    const MIME_TYPE = imageInputFile.type;
    const QUALITY = 0.95;
    const MAX_WIDTH = maxWidth ? maxWidth : null;

    const file = imageInputFile; // get the file
    const blobURL = URL.createObjectURL(file);
    const img = new Image();

    /** ********************* Add source to new image */
    img.src = blobURL;

    imageDataBase64 = await new Promise((res, rej) => {
        /** ********************* Handle Errors in loading image */
        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            console.log("Cannot load image");
        };

        /** ********************* Handle new image when loaded */
        img.onload = function () {
            URL.revokeObjectURL(this.src);

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

    imageSize = await new Promise((res, rej) => {
        canvas.toBlob(
            (blob) => {
                res(blob.size);
            },
            MIME_TYPE,
            QUALITY
        );
    });

    return {
        imageBase64: imageDataBase64.replace(/.*?base64,/, ""),
        imageBase64Full: imageDataBase64,
        imageName: imageName,
        imageSize: imageSize,
    };
}

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
