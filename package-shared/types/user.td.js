// @ts-check

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
 * @property {DATASQUIREL_LoggedInUser  | null} payload - Payload of the response
 * @property {string} [msg] - An optional message
 * @property {number} [userId] - An optional message
 */

/**
 * @typedef {object} SuccessUserObject
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 */

/**
 * @typedef {object} AddUserFunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {SuccessUserObject | null} [payload] - Payload
 * @property {string} [msg]
 * @property {any} [sqlResult]
 */

/**
 * @typedef {object} GoogleIdentityPromptNotification
 * @property {function(): string} getMomentType - Notification moment type
 * @property {function(): string} getDismissedReason - Notification get Dismissed Reason
 * @property {function(): string} getNotDisplayedReason - Notification get Not Displayed Reason
 * @property {function(): string} getSkippedReason - Notification get Skipped Reason
 * @property {function(): boolean} isDismissedMoment - Notification is Dismissed Moment
 * @property {function(): boolean} isDisplayMoment - Notification is Display Moment
 * @property {function(): boolean} isDisplayed - Notification is Displayed
 * @property {function(): boolean} isNotDisplayed - Notification is Not Displayed
 * @property {function(): boolean} isSkippedMoment - Notification is Skipped Moment
 */

/**
 * @typedef {object} UserDataPayload
 * @property {string} first_name - First Name *Required
 * @property {string} last_name - Last Name *Required
 * @property {string} email - Email *Required
 * @property {string} password - Password *Required
 * @property {string?} username - Username (Optional)
 */

/**
 * @typedef {object} GetUserFunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {{
 *   id: number,
 *   first_name: string,
 *   last_name: string,
 *   username: string,
 *   email: string,
 *   phone: string,
 *   social_id: [string],
 *   image: string,
 *   image_thumbnail: string,
 *   verification_status: [number],
 * }} payload - Payload
 */

/**
 * @typedef {object} ReauthUserFunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {DATASQUIREL_LoggedInUser  | null} payload - Payload
 * @property {string} [msg] - Response Message
 * @property {number} [userId] - user ID
 * @property {string} [token] - new Token
 */

/**
 * @typedef {object} UpdateUserFunctionReturn
 * @property {boolean} success - Did the function run successfully?
 * @property {(Object[]|string)} [payload=[]] - Payload
 */
