/**
 * @typedef {object} DATASQUIREL_LoggedInUser
 * @property {number} id - user id (number)
 * @property {string} first_name - User First Name
 * @property {string} last_name - User Last Name
 * @property {string} image - User Full Image
 * @property {string} image_thumbnail - User Image Thumbnail
 * @property {string} [social_id] - User Social id if available
 * @property {number} social_login - 0 or 1 => is this user a social user(1) or not(0)
 * @property {string} csrf_k - CSRF key
 * @property {boolean} logged_in_status - Is user logged in or not
 */

module.exports = { DATASQUIREL_LoggedInUser };
