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
const reAuthUser = require("./users/reauth-user");
const getUser = require("./users/get-user");
const loginWithGoogle = require("./users/social/google-auth");

/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */
/** ****************************************************************************** */

/**
 * ==============================================================================
 * User Functions Object
 * ==============================================================================
 */
const user = {
    createUser: createUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    userAuth: userAuth,
    reAuthUser: reAuthUser,
    updateUser: updateUser,
    getUser: getUser,
    social: {
        loginWithGoogle: loginWithGoogle,
    },
};

/**
 * ==============================================================================
 * Media Functions Object
 * ==============================================================================
 */
const media = {
    uploadImage: uploadImage,
};

/**
 * ==============================================================================
 * Main Export
 * ==============================================================================
 */
const datasquirel = {
    get: get,
    post: post,
    media: media,
    user: user,
};

module.exports = datasquirel;

/** ********************************************** */
/** ********************************************** */
/** ********************************************** */
