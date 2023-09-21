/**
 * Imports
 * ==============================================================================
 */
const https = require("https");
const http = require("http");

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * Main Function
 * ==============================================================================
 * @param {{
 *  url?: string,
 *  method: string,
 *  hostname: string,
 *  path?: string,
 *  href?: string,
 *  headers?: object,
 *  body?: object,
 * }} params - params
 */
function httpsRequest({ url, method, hostname, path, href, headers, body }) {
    const reqPayloadString = body ? JSON.stringify(body) : null;

    const scheme = process.env.DSQL_HTTP_SCHEME;
    const localHost = process.env.DSQL_LOCAL_HOST;
    const localHostPort = process.env.DSQL_LOCAL_HOST_PORT;

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    let requestOptions = {
        method: method,
        hostname: localHost || hostname,
        port: localHostPort || 443,
        headers: {},
    };

    if (path) requestOptions.path = path;
    if (href) requestOptions.href = href;

    if (headers) requestOptions.headers = headers;
    if (body) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.headers["Content-Length"] = Buffer.from(
            reqPayloadString || ""
        ).length;
    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    return new Promise((res, rej) => {
        const httpsRequest = (scheme?.match(/^http$/i) ? http : https).request(
            /* ====== Request Options object ====== */
            // @ts-ignore
            url ? url : requestOptions,

            ////////////////////////////////////////////////
            ////////////////////////////////////////////////
            ////////////////////////////////////////////////

            /* ====== Callback function ====== */
            (response) => {
                var str = "";

                // ## another chunk of data has been received, so append it to `str`
                response.on("data", function (chunk) {
                    str += chunk;
                });

                // ## the whole response has been received, so we just print it out here
                response.on("end", function () {
                    res(str);
                });

                response.on("error", (error) => {
                    console.log("HTTP response error =>", error.message);
                });
            }
        );

        if (body) httpsRequest.write(reqPayloadString);

        httpsRequest.on("error", (error) => {
            console.log("HTTPS request ERROR =>", error);
        });

        httpsRequest.end();

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
    });
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

module.exports = httpsRequest;
