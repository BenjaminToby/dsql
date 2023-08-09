// @ts-check

/**
 * Imports
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
const loginWithGithub = require("./users/social/github-auth");
const getToken = require("./users/get-token");
const validateToken = require("./users/validate-token");
const sanitizeSql = require("./utils/functions/sanitizeSql");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

/**
 * User Functions Object
 */
const user = {
    createUser: createUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    userAuth: userAuth,
    reAuthUser: reAuthUser,
    updateUser: updateUser,
    getUser: getUser,
    getToken: getToken,
    validateToken: validateToken,
    social: {
        loginWithGoogle: loginWithGoogle,
        loginWithGithub: loginWithGithub,
    },
};

/**
 * Media Functions Object
 */
const media = {
    uploadImage: uploadImage,
};

/**
 * Main Export
 */
const datasquirel = {
    get: get,
    post: post,
    media: media,
    user: user,
    sanitizeSql: sanitizeSql,
};

module.exports = datasquirel;

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
