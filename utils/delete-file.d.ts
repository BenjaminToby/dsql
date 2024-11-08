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
 * }} payload - Payload containing the url for the image and its thumbnail
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
 * @param { string } params.url - File URL
 *
 * @returns { Promise<FunctionReturn> } - Image Url
 */
declare function uploadImage({ key, url }: {
    key: string;
    url: string;
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
    };
    /**
     * - An optional message
     */
    msg?: string;
};
