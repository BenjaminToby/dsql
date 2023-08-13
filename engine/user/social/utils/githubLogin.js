// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const fs = require("fs");
const httpsRequest = require("./httpsRequest");
const dbHandler = require("../../../engine/utils/dbHandler");

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @typedef {object} GithubUserPayload
 * @property {string} login - Full name merged eg. "JohnDoe"
 * @property {number} id - github user id
 * @property {string} node_id - Some other id
 * @property {string} avatar_url - profile picture
 * @property {string} gravatar_id - some other id
 * @property {string} url - Github user URL
 * @property {string} html_url - User html URL - whatever that means
 * @property {string} followers_url - Followers URL
 * @property {string} following_url - Following URL
 * @property {string} gists_url - Gists URL
 * @property {string} starred_url - Starred URL
 * @property {string} subscriptions_url - Subscriptions URL
 * @property {string} organizations_url - Organizations URL
 * @property {string} repos_url - Repositories URL
 * @property {string} received_events_url - Received Events URL
 * @property {string} type - Common value => "User"
 * @property {boolean} site_admin - Is site admin or not? Boolean
 * @property {string} name - More like "username"
 * @property {string} company - User company
 * @property {string} blog - User blog URL
 * @property {string} location - User Location
 * @property {string} email - User Email
 * @property {string} hireable - Is user hireable
 * @property {string} bio - User bio
 * @property {string} twitter_username - User twitter username
 * @property {number} public_repos - Number of public repositories
 * @property {number} public_gists - Number of public gists
 * @property {number} followers - Number of followers
 * @property {number} following - Number of following
 * @property {string} created_at - Date created
 * @property {string} updated_at - Date updated
 */

/**
 * Login/signup a github user
 * ==============================================================================
 * @async
 *
 * @param {Object} params - foundUser if any
 * @param {string} params.code - github auth token
 * @param {string} params.clientId - github client Id
 * @param {string} params.clientSecret - github client Secret
 *
 * @returns {Promise<GithubUserPayload|null>}
 */
async function githubLogin({ code, clientId, clientSecret }) {
    /** @type {GithubUserPayload | null} */
    let gitHubUser = null;

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    try {
        /**
         * Create new user folder and file
         *
         * @description Create new user folder and file
         */
        // const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}`);
        const response = await httpsRequest({
            method: "POST",
            hostname: "github.com",
            path: `/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
            headers: {
                Accept: "application/json",
                "User-Agent": "*",
            },
        });

        // `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}`,
        // body: JSON.stringify({
        //     client_id: process.env.GITHUB_ID,
        //     client_secret: process.env.GITHUB_SECRET,
        //     code: code,
        // }),

        const accessTokenObject = JSON.parse(response);

        if (!accessTokenObject?.access_token) {
            return gitHubUser;
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        const userDataResponse = await httpsRequest({
            method: "GET",
            hostname: "api.github.com",
            path: "/user",
            headers: {
                Authorization: `Bearer ${accessTokenObject.access_token}`,
                "User-Agent": "*",
            },
        });

        gitHubUser = JSON.parse(userDataResponse);

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        if (!gitHubUser?.email) {
            const existingGithubUser = await dbHandler({
                query: `SELECT email FROM users WHERE social_login='1' AND social_platform='github' AND social_id= ?`,
                values: [gitHubUser?.id || ""],
            });

            if (existingGithubUser && existingGithubUser[0] && gitHubUser) {
                gitHubUser.email = existingGithubUser[0].email;
            }
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
    } catch (error) {
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        console.log("ERROR in githubLogin.js backend function =>", error.message);

        // serverError({
        //     component: "/api/social-login/github-auth/catch-error",
        //     message: error.message,
        //     user: user,
        // });

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    return gitHubUser;
}

module.exports = githubLogin;
