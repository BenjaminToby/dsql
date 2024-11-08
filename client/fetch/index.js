/** @type {import("../../package-shared/types").FetchApiFn} */
async function clientFetch() {
    let data;

    if (typeof options === "string") {
        try {
            let fetchData;
            const csrfValue = localStorage.getItem("csrf");

            switch (options) {
                case "post":
                    fetchData = await fetch(url, {
                        method: options,
                        headers: {
                            "Content-Type": "application/json",
                            "x-csrf-auth": csrf ? csrfValue : "",
                        },
                    });
                    data = fetchData.json();
                    break;

                default:
                    fetchData = await fetch(url);
                    data = fetchData.json();
                    break;
            }
        } catch (/** @type {any} */ error) {
            console.log("FetchAPI error #1:", error.message);
            data = null;
        }
    } else if (typeof options === "object") {
        try {
            let fetchData;

            const csrfValue = localStorage.getItem("csrf");

            if (options.body && typeof options.body === "object") {
                let oldOptionsBody = _.cloneDeep(options.body);
                options.body = JSON.stringify(oldOptionsBody);
            }

            if (options.headers) {
                options.headers["x-csrf-auth"] = csrf ? csrfValue : "";

                const finalOptions = { ...options };
                fetchData = await fetch(url, finalOptions);
            } else {
                fetchData = await fetch(url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrf-auth": csrf ? csrfValue : "",
                    },
                });
            }

            data = fetchData.json();
        } catch (/** @type {any} */ error) {
            console.log("FetchAPI error #2:", error.message);
            data = null;
        }
    } else {
        try {
            let fetchData = await fetch(url);
            data = fetchData.json();
        } catch (/** @type {any} */ error) {
            console.log("FetchAPI error #3:", error.message);
            data = null;
        }
    }

    return data;
}

module.exports = clientFetch;
exports.fetchApi = clientFetch;
