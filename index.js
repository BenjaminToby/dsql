/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const get = require("./utils/get");
const post = require("./utils/post");
const uploadImage = require("./utils/upload-image");
const createUser = require("./users/add-user");
const updateUser = require("./users/update-user");
const loginUser = require("./users/login-user");
const logoutUser = require("./users/logout-user");
const userAuth = require("./users/user-auth");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @param {Object} mailObject - foundUser if any
 */
const datasquirel = {
    get: get,
    post: post,
    media: {
        uploadImage: uploadImage,
    },
    user: {
        createUser: createUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        userAuth: userAuth,
        updateUser: updateUser,
    },
};

module.exports = datasquirel;

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
