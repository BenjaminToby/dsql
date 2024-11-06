// @ts-check

const sanitizeHtmlOptions = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "span", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "img", "div", "button", "pre", "code", "br"],
    allowedAttributes: {
        a: ["href"],
        img: ["src", "alt", "width", "height", "class", "style"],
        "*": ["style", "class"],
    },
};

module.exports = sanitizeHtmlOptions;
