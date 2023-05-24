/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const imageInputFileToBase64 = require("./media/imageInputFileToBase64");
const imageInputToBase64 = require("./media/imageInputToBase64");
const inputFileToBase64 = require("./media/inputFileToBase64");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * ==============================================================================
 * Media Functions Object
 * ==============================================================================
 */
const media = {
    imageInputToBase64: imageInputToBase64,
    imageInputFileToBase64: imageInputFileToBase64,
    inputFileToBase64: inputFileToBase64,
};

/**
 * ==============================================================================
 * Main Export
 * ==============================================================================
 */
const datasquirelClient = {
    media: media,
};

module.exports = datasquirelClient;

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
