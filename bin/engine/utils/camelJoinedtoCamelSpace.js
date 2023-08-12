// @ts-check

/**
 * Convert Camel Joined Text to Camel Spaced Text
 * ==============================================================================
 * @description this function takes a camel cased text without spaces, and returns
 * a camel-case-spaced text
 *
 * @param {string} text - text string without spaces
 *
 * @returns {string | null}
 */
module.exports = function camelJoinedtoCamelSpace(text) {
    if (!text?.match(/./)) {
        return "";
    }

    if (text?.match(/ /)) {
        return text;
    }

    if (text) {
        let textArray = text.split("");

        let capIndexes = [];

        for (let i = 0; i < textArray.length; i++) {
            const char = textArray[i];

            if (i === 0) continue;
            if (char.match(/[A-Z]/)) {
                capIndexes.push(i);
            }
        }

        let textChunks = [`${textArray[0].toUpperCase()}${text.substring(1, capIndexes[0])}`];

        for (let j = 0; j < capIndexes.length; j++) {
            const capIndex = capIndexes[j];
            if (capIndex === 0) continue;

            const startIndex = capIndex + 1;
            const endIndex = capIndexes[j + 1];

            textChunks.push(`${textArray[capIndex].toUpperCase()}${text.substring(startIndex, endIndex)}`);
        }

        return textChunks.join(" ");
    } else {
        return null;
    }
};
