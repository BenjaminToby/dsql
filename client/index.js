// @ts-check

/**
 * Imports
 */
const imageInputFileToBase64 = require("./media/imageInputFileToBase64");
const imageInputToBase64 = require("./media/imageInputToBase64");
const inputFileToBase64 = require("./media/inputFileToBase64");
const getAccessToken = require("./auth/google/getAccessToken");
const getGithubAccessToken = require("./auth/github/getAccessToken");
const logout = require("./auth/logout");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

/**
 * Media Functions Object
 */
const media = {
    imageInputToBase64: imageInputToBase64,
    imageInputFileToBase64: imageInputFileToBase64,
    inputFileToBase64: inputFileToBase64,
};

/**
 * User Auth Object
 */
const auth = {
    google: {
        getAccessToken: getAccessToken,
    },
    github: {
        getAccessToken: getGithubAccessToken,
    },
    logout: logout,
};

/**
 * Main Export
 */
const datasquirelClient = {
    media: media,
    auth: auth,
};

module.exports = datasquirelClient;
