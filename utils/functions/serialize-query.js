// @ts-check

/** @type {import("@/package-shared/types/general.td").SerializeQueryFnType} */
function serializeQuery({ query }) {
    let str = "?";
    const keys = Object.keys(query);

    /** @type {string[]} */
    const queryArr = [];
    keys.forEach((key) => {
        queryArr.push(`${key}=${query[key]}`);
    });
    str += queryArr.join("&");
    return str;
}

module.exports = serializeQuery;
