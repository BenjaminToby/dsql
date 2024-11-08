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
 * } | null} payload - Payload containing the url for the image and its thumbnail
 * @property {string} [msg] - An optional message
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
 *    fileData: string,
 *    fileName: string,
 *    mimeType?: string,
 *    folder?: string,
 *    isPrivate?: boolean,
 * }} params.payload - Image Data Eg.
 *
 * @returns { Promise<FunctionReturn> } - Return Object
 */
declare function uploadImage({ key, payload }: {
    key: string;
    payload: {
        fileData: string;
        fileName: string;
        mimeType?: string;
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
    } | null;
    /**
     * - An optional message
     */
    msg?: string;
};
