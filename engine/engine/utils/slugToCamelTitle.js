// @ts-check

/**
 *
 * @param {string} text
 * @returns
 */
module.exports = function slugToCamelTitle(text) {
    if (text) {
        let addArray = text.split("-").filter((item) => item !== "");
        let camelArray = addArray.map((item) => {
            return (
                item.substr(0, 1).toUpperCase() + item.substr(1).toLowerCase()
            );
        });

        let parsedAddress = camelArray.join(" ");

        return parsedAddress;
    } else {
        return null;
    }
};
