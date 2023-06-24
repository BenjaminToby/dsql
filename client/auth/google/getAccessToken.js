/**
 * Type Definitions
 * ===============================================================================
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

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * Login with Google Function
 * ===============================================================================
 * @description This function uses google identity api to login a user with datasquirel
 *
 * @async
 *
 * @param {object} params - Single object passed
 * @param {string} params.clientId - Google app client ID: {@link https://datasquirel.com/docs}
 * @param {HTMLElement} params.element - HTML Element to display google login button
 * @param {boolean} params.triggerPrompt - Whether to trigger Google signing popup or not: {@link https://datasquirel.com/docs}
 * @param {function(): void} [params.readyStateDispatch] - React setState Function: sets whether the google login button is ready or not
 *
 * @returns {Promise<boolean>} - Return
 */
module.exports = async function getAccessToken({ clientId, element, triggerPrompt, readyStateDispatch }) {
    /**
     * == Initialize
     *
     * @description Initialize
     */
    const googleScript = document.createElement("script");
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.className = "social-script-tag";

    document.body.appendChild(googleScript);

    const response = await new Promise((resolve, reject) => {
        googleScript.onload = function (e) {
            if (google) {
                if (readyStateDispatch) readyStateDispatch(true);

                ////////////////////////////////////////
                ////////////////////////////////////////
                ////////////////////////////////////////

                if (element) {
                    /**
                     * Handle google credentials response
                     * ========================================================
                     * @param {object} response - Google response with credentials
                     * @param {string} response.credential - Google access token
                     */
                    function handleCredentialResponse(response) {
                        resolve(response.credential);
                    }

                    google.accounts.id.initialize({
                        client_id: clientId,
                        callback: handleCredentialResponse,
                    });

                    google.accounts.id.renderButton(element, {
                        theme: "outline",
                        size: "large",
                        logo_alignment: "center",
                    });
                }

                ////////////////////////////////////////
                ////////////////////////////////////////
                ////////////////////////////////////////

                if (triggerPrompt) {
                    google.accounts.id.prompt(
                        /**
                         * Google prompt notification callback
                         * ========================================================
                         * @param {GoogleIdentityPromptNotification} notification - Notification object
                         */
                        (notification) => {
                            notification.isDisplayed();
                        }
                    );
                }
            }
        };
    });

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    return response;
};
