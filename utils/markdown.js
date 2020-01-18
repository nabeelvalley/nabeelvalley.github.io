const Converter = require('showdown').Converter
const showdownHighlighter = require('showdown-highlight')

const externalLinksInNewWindow = {
    type: 'output',
    regex: /<a\shref[^>]+>/g,
    replace: (text) => {
        var url = text.match(/"(.*?)"/)[1]
        if (url.includes('http://') || url.includes('https://')) {
            return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">'
        }
        return text
    }
}

const scrollableTables = {
    type: 'output',
    regex: /<table[^>]*>(?:.|\n)*?<\/table>/,
    replace: (text) => `<div class="scrollable">${text}</div>`
}


const codeTab = {
    type: 'lang',
    regex: /^`([^`]*)`$/gm,
    replace: (text) => `<p class="code-tab"><code>${text.slice(1, -1)}</code></p>`
}

const codeSummary = {
    type: 'output',
    regex: /<summary>`([^`]*)`<\/summary>/gm,
    replace: (text) =>
        `${text.replace('`', '<code>')
            .replace('`', '</code>')
        }`
}


const convertMarkdownToHtml = (text) => {
    const converter = new Converter({
        headerLevelStart: 2,
        parseImgDimensions: true,
        extensions: [codeTab, showdownHighlighter, externalLinksInNewWindow, scrollableTables, codeSummary],
        simplifiedAutoLink: true,
        tables: true,
        ghCompatibleHeaderId: true,
        disableForced4SpacesIndentedSublists: true
    })
    const html = converter.makeHtml(text)
    return html
}

module.exports = convertMarkdownToHtml