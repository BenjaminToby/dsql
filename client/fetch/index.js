// @ts-check

const _ = require("lodash");

/** @type {import("../../package-shared/types").FetchApiFn} */
async function clientFetch(url, options, contentType) {
    let data;
    let finalUrl = url;

    if (typeof options === "string") {
        try {
            let fetchData;

            switch (options) {
                case "post":
                    fetchData = await fetch(finalUrl, {
                        method: options,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    data = await fetchData.json();
                    break;

                default:
                    fetchData = await fetch(finalUrl);
                    data = await fetchData.json();
                    break;
            }
        } catch (/** @type {any} */ error) {
            console.log("FetchAPI error #1:", error.message);
            data = null;
        }
    } else if (typeof options === "object") {
        try {
            let fetchData;

            if (options.query) {
                let pathSuffix = "";
                pathSuffix += "?";
                const queryString = Object.keys(options.query)
                    ?.map((queryKey) => {
                        if (!options.query?.[queryKey]) return undefined;
                        if (typeof options.query[queryKey] == "object") {
                            return `${queryKey}=${JSON.stringify(
                                options.query[queryKey]
                            )}`;
                        }
                        return `${queryKey}=${options.query[queryKey]}`;
                    })
                    .filter((prt) => prt)
                    .join("&");
                pathSuffix += queryString;
                finalUrl += pathSuffix;
                delete options.query;
            }

            if (options.body && typeof options.body === "object") {
                let oldOptionsBody = _.cloneDeep(options.body);
                options.body = JSON.stringify(oldOptionsBody);
            }

            if (options.headers) {
                /** @type {any} */
                const finalOptions = { ...options };

                fetchData = await fetch(finalUrl, finalOptions);
            } else {
                fetchData = await fetch(finalUrl, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            data = await fetchData.json();
        } catch (/** @type {any} */ error) {
            console.log("FetchAPI error #2:", error.message);
            data = null;
        }
    } else {
        try {
            let fetchData = await fetch(finalUrl);
            data = await fetchData.json();
        } catch (/** @type {any} */ error) {
            console.log("FetchAPI error #3:", error.message);
            data = null;
        }
    }

    return data;
}

module.exports = clientFetch;
exports.fetchApi = clientFetch;
