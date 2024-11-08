export = githubLogin;
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
declare function githubLogin({ code, clientId, clientSecret }: {
    code: string;
    clientId: string;
    clientSecret: string;
}): Promise<GithubUserPayload | null>;
declare namespace githubLogin {
    export { GithubUserPayload };
}
type GithubUserPayload = {
    /**
     * - Full name merged eg. "JohnDoe"
     */
    login: string;
    /**
     * - github user id
     */
    id: number;
    /**
     * - Some other id
     */
    node_id: string;
    /**
     * - profile picture
     */
    avatar_url: string;
    /**
     * - some other id
     */
    gravatar_id: string;
    /**
     * - Github user URL
     */
    url: string;
    /**
     * - User html URL - whatever that means
     */
    html_url: string;
    /**
     * - Followers URL
     */
    followers_url: string;
    /**
     * - Following URL
     */
    following_url: string;
    /**
     * - Gists URL
     */
    gists_url: string;
    /**
     * - Starred URL
     */
    starred_url: string;
    /**
     * - Subscriptions URL
     */
    subscriptions_url: string;
    /**
     * - Organizations URL
     */
    organizations_url: string;
    /**
     * - Repositories URL
     */
    repos_url: string;
    /**
     * - Received Events URL
     */
    received_events_url: string;
    /**
     * - Common value => "User"
     */
    type: string;
    /**
     * - Is site admin or not? Boolean
     */
    site_admin: boolean;
    /**
     * - More like "username"
     */
    name: string;
    /**
     * - User company
     */
    company: string;
    /**
     * - User blog URL
     */
    blog: string;
    /**
     * - User Location
     */
    location: string;
    /**
     * - User Email
     */
    email: string;
    /**
     * - Is user hireable
     */
    hireable: string;
    /**
     * - User bio
     */
    bio: string;
    /**
     * - User twitter username
     */
    twitter_username: string;
    /**
     * - Number of public repositories
     */
    public_repos: number;
    /**
     * - Number of public gists
     */
    public_gists: number;
    /**
     * - Number of followers
     */
    followers: number;
    /**
     * - Number of following
     */
    following: number;
    /**
     * - Date created
     */
    created_at: string;
    /**
     * - Date updated
     */
    updated_at: string;
};
