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
 * @type {Object}
 * @property {Function} createUser - Create User Function
 * @property {Function} loginUser - Login User Function
 * @property {Function} logoutUser - Logout User Function
 * @property {Function} userAuth - User Auth Function
 * @property {Function} updateUser - Update User Function
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
 * @type {Object}
 * @property {Function} uploadImage - Upload Image async Function
 */
const media = {
    uploadImage: uploadImage,
};

/**
 * ==============================================================================
 * Main Export
 * ==============================================================================
 * @type {Object}
 * @property {Function} get - get Function
 * @property {Function} post - post Function
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
