// @ts-check

/**
 * Login with Github Function
 * ===============================================================================
 * @description This function uses github api to login a user with datasquirel
 *
 * @async
 *
 * @param {object} params - Single object passed
 * @param {string} params.clientId - Github app client ID: {@link https://datasquirel.com/docs}
 * @param {string} params.redirectUrl - Github Redirect URL as listed in your oauth app settings: {@link https://datasquirel.com/docs}
 * @param {function(boolean): void} [params.setLoading] - React setState Function: sets whether the google login button is ready or not
 *
 * @returns {void} - Return
 */
module.exports = function getAccessToken({ clientId, redirectUrl, setLoading }) {
    /**
     * == Initialize
     *
     * @description Initialize
     */
    if (setLoading) setLoading(true);

    const fetchUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user&redirect_uri=${redirectUrl}${window.location.pathname}`;
    window.location.assign(fetchUrl);

    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
};
