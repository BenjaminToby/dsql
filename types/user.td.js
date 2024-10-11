/**
 * @typedef {object} DATASQUIREL_LoggedInUser
 * @property {number} [id]
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} [phone]
 * @property {string} [user_type]
 * @property {string} [username]
 * @property {string} password
 * @property {string} [image]
 * @property {string} [image_thumbnail]
 * @property {string} [address]
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [country]
 * @property {string} [zip_code]
 * @property {number} [social_login]
 * @property {string?} [social_platform]
 * @property {string?} [social_id]
 * @property {string} [more_user_data]
 * @property {number} [verification_status]
 * @property {number?} [loan_officer_id]
 * @property {number} [is_admin]
 * @property {number} [admin_level]
 * @property {string} [admin_permissions]
 * @property {string?} uuid
 * @property {string?} [temp_login_code]
 * @property {string?} [date_created]
 * @property {number?} [date_created_code]
 * @property {string?} [date_created_timestamp]
 * @property {string?} [date_updated]
 * @property {number?} [date_updated_code]
 * @property {string?} [date_updated_timestamp]
 * @property {string} [csrf_k] - CSRF key
 * @property {boolean} [logged_in_status]
 * @property {number} [date]
 * @property {any} [more_data]
 */

/**
 * @typedef {object} AuthenticatedUser
 * @property {boolean} success - Did the function run successfully?
 * @property {import("../types/user.td").DATASQUIREL_LoggedInUser  | null} payload - Payload of the response
 * @property {string} [msg] - An optional message
 * @property {number} [userId] - An optional message
 */

module.exports = { DATASQUIREL_LoggedInUser, AuthenticatedUser };
