// @ts-check

/** @type {import("@/package-shared/types").SerializeQueryFnType} */
function serializeQuery({ query }) {
    let str = "?";
    const keys = Object.keys(query);

    /** @type {string[]} */
    const queryArr = [];
    keys.forEach((key) => {
        if (!key || !query[key]) return;
        queryArr.push(`${key}=${query[key]}`);
    });
    str += queryArr.join("&");
    return str;
}

module.exports = serializeQuery;
