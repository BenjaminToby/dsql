/**
 * Type Definitions
 * ===============================================================================
 */

const parseClientCookies = require("../utils/parseClientCookies");

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
 * @param {object|null} params - Single object passed
 * @param {string|null} params.googleClientId - Google client Id if applicable
 *
 * @requires localStorageUser - a "user" JSON string stored in local storage with all
 * the necessary user data gotten from the server
 *
 * @returns {Promise<boolean>} - Return
 */
module.exports = async function logout(params) {
    /**
     * == Initialize
     *
     * @description Initialize
     */
    const localUser = localStorage.getItem("user");
    let targetUser;

    try {
        targetUser = JSON.parse(localUser);
    } catch (error) {
        console.log(error);
    }

    if (!targetUser) {
        window.alert("NO client user object found in localStorage");
        return false;
    }

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    const cookies = parseClientCookies();
    const socialId = cookies?.datasquirel_social_id && typeof cookies.datasquirel_social_id == "string" && !cookies.datasquirel_social_id.match(/^null$/i) ? cookies.datasquirel_social_id : null;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    localStorage.setItem("user", "{}");
    localStorage.removeItem("csrf");

    document.cookie = `datasquirel_social_id=null;samesite=strict;path=/`;

    ////////////////////////////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    const response = await new Promise((resolve, reject) => {
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////

        if (socialId && !socialId?.match(/^null$/i)) {
            const googleClientId = params?.googleClientId;

            if (googleClientId) {
                const googleScript = document.createElement("script");
                googleScript.src = "https://accounts.google.com/gsi/client";
                googleScript.className = "social-script-tag";

                document.body.appendChild(googleScript);

                ////////////////////////////////////////
                ////////////////////////////////////////
                ////////////////////////////////////////

                googleScript.onload = function (e) {
                    if (google) {
                        ////////////////////////////////////////
                        ////////////////////////////////////////
                        ////////////////////////////////////////

                        google.accounts.id.initialize({
                            client_id: googleClientId,
                        });

                        google.accounts.id.revoke(socialId, (done) => {
                            console.log(done.error);

                            resolve(true);
                        });

                        ////////////////////////////////////////
                        ////////////////////////////////////////
                        ////////////////////////////////////////
                    }
                };
            } else {
                resolve(true);
            }

            ////////////////////////////////////////
            ////////////////////////////////////////
            ////////////////////////////////////////
        } else {
            resolve(true);
        }

        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
    });

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    return response;

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
};