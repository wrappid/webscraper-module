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