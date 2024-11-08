export = uploadImage;
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/**
 * @typedef {Object} FunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{
 *   urlPath: string,
 *   urlThumbnailPath: string
 * } | null} payload - Payload containing the url for the image and its thumbnail
 *  @property {string} [msg] - An optional message
 */
/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @async
 *
 * @param {Object} params - Single Param object containing params
 * @param {String} params.key - *FULL ACCESS API Key
 * @param {{
 *    imageData: string,
 *    imageName: string,
 *    mimeType?: string,
 *    thumbnailSize?: number,
 *    folder?: string,
 *    isPrivate?: boolean,
 * }} params.payload - Image Data Eg.
 *
 * @returns { Promise<FunctionReturn> } - Return Object
 */
declare function uploadImage({ key, payload }: {
    key: string;
    payload: {
        imageData: string;
        imageName: string;
        mimeType?: string;
        thumbnailSize?: number;
        folder?: string;
        isPrivate?: boolean;
    };
}): Promise<FunctionReturn>;
declare namespace uploadImage {
    export { FunctionReturn };
}
type FunctionReturn = {
    /**
     * - Did the function run successfully?
     */
    success: boolean;
    /**
     * - Payload containing the url for the image and its thumbnail
     */
    payload: {
        urlPath: string;
        urlThumbnailPath: string;
    } | null;
    /**
     * - An optional message
     */
    msg?: string;
};
