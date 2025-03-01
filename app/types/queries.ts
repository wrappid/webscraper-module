// types/queries.ts
export const predefinedQueries = [
    {
        select: ['href'],
        from: 'a',
        where: {},
        alias: 'Links'
    },
    {
        select: ['src', 'alt'],
        from: 'img, audio, video',
        where: {},
        alias: 'Media'
    },
    {
        select: ['textContent'],
        from: 'div, span, h1, h2, h3, h4, h5, h6, p',
        where: {},
        alias: 'Texts'
    },
    {
        select: ['id'],
        from: '*',
        where: {},
        alias: 'IDs'
    },
    {
        select: ['class'],
        from: '*',
        where: {},
        alias: 'Classes'
    }
];

export const htmlTags = [
    "a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", 
    "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "data", 
    "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fencedframe", 
    "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "head", 
    "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", 
    "marquee", "menu", "meta", "meter", "nav", "nobr", "noembed", "noframes", "noscript", 
    "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "pre", "progress", "q", 
    "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "search", "section", "select", "slot", "small", "source", 
    "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", 
    "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"
  ];
  