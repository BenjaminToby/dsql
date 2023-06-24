/**
 * @typedef {{
 *  fileBase64: string,
 *  fileBase64Full: string,
 *  fileName: string,
 *  fileSize: number,
 *  fileType: string,
 * }} FunctionReturn
 */

/**
 * Login with Google Function
 * ==============================================================================
 * @description This function takes in a *SINGLE* input file from a HTML file input element.
 * HTML file input elements usually return an array of input objects, so be sure to select the target
 * file from the array.
 *
 * @async
 *
 * @param {object} params - Single object passed
 * @param {string} params.clientId - Google app client ID {@link https://datasquirel.com/docs}
 * @param {HTMLElement} params.element - HTML Element to display google login button
 * @param {boolean} params.triggerPrompt - Whether to trigger Google signing popup or not: {@link https://datasquirel.com/docs}
 * @param {function(): void} [params.readyStateDispatch] - React setState Function: sets value to "true"
 *
 * @returns { Promise } - Return
 */
module.exports = async function loginWithGithub({ clientId, element, triggerPrompt, readyStateDispatch }) {
    /**
     * == Initialize
     *
     * @description Initialize
     */
    const googleScript = document.createElement("script");
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.className = "social-script-tag";

    document.body.appendChild(googleScript);

    googleScript.onload = function (e) {
        if (google) {
            if (readyStateDispatch) readyStateDispatch(true);

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////

            if (element) {
                function handleCredentialResponse(response) {
                    userLoginWithGoogle({
                        gUser: null,
                        tokenRes: response.credential,
                        setLoading,
                    });
                }

                google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                });

                google.accounts.id.renderButton(document.getElementById("google-identity-button"), {
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
                     * @param {object} notification - Notification object
                     * @param {function(): string} notification.getMomentType - Notification moment type
                     * @param {function(): string} notification.getDismissedReason - Notification get Dismissed Reason
                     * @param {function(): string} notification.getNotDisplayedReason - Notification get Not Displayed Reason
                     * @param {function(): string} notification.getSkippedReason - Notification get Skipped Reason
                     * @param {function(): boolean} notification.isDismissedMoment - Notification is Dismissed Moment
                     * @param {function(): boolean} notification.isDisplayMoment - Notification is Display Moment
                     * @param {function(): boolean} notification.isDisplayed - Notification is Displayed
                     * @param {function(): boolean} notification.isNotDisplayed - Notification is Not Displayed
                     * @param {function(): boolean} notification.isSkippedMoment - Notification is Skipped Moment
                     */
                    (notification) => {
                        notification.isDisplayed();
                    }
                );
            }
        }
    };

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    const currentLocation = window.location.pathname;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * Login with google callback function
 * ==============================================================================
 * @description This function takes in a *SINGLE* input file from a HTML file input element.
 * HTML file input elements usually return an array of input objects, so be sure to select the target
 * file from the array.
 *
 * @async
 *
 * @param {object} params - Single object passed
 * @param {string} params.clientId - Google app client ID {@link https://datasquirel.com/docs}
 * @param {HTMLElement} params.element - HTML Element to display google login button
 * @param {boolean} params.triggerPrompt - Whether to trigger Google signing popup or not: {@link https://datasquirel.com/docs}
 * @param {function(): void} [params.readyStateDispatch] - React setState Function: sets value to "true"
 *
 * @returns { Promise } - Return
 */
function userLoginWithGoogle({ gUser, tokenRes, setLoading }) {
    setLoading(true);

    if (!tokenRes) {
        console.log("No Token Response received!");
        return closeLoader();
    }

    fetchApi(`/api/social-login/google-auth${window.location.search}`, {
        method: "post",
        body: {
            token: tokenRes,
        },
    })
        .then(async (res) => {
            if (res.success && res.user) {
                localStorage.setItem("csrf", res.user.csrf_k);
                localStorage.setItem("user", JSON.stringify(res.user));

                window.location.reload();
            } else {
                console.log(res);
                setLoading(false);

                if (res.alert) {
                    window.alert(res.msg);
                }
            }
        })
        .catch(async (err) => {
            alert("Login Failed");

            console.log("Google login fetch error => ", err);

            setLoading(false);
        });
}
