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
 * User Functions Object
 * ==============================================================================
 * @type {{
 *    createUser: Function
 *    loginUser: Function
 *    logoutUser: Function
 *    userAuth: Function
 *    updateUser: Function
 *  }}
 */
const user = {
    createUser: createUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    userAuth: userAuth,
    updateUser: updateUser,
};

/**
 * ==============================================================================
 * Media Functions Object
 * ==============================================================================
 * @type {{
 *  uploadImage: Function
 * }}
 */
const media = {
    uploadImage: uploadImage,
};

/**
 * ==============================================================================
 * Main Export
 * ==============================================================================
 * @type {{
 *   get: Function,
 *   post: Function,
 *   media: {
 *       uploadImage: Function
 *   },
 *   user: {
 *       createUser: Function
 *       loginUser: Function
 *       logoutUser: Function
 *       userAuth: Function
 *       updateUser: Function
 *   },
 * }}
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
