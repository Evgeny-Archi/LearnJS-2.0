import {row, col} from './utils'

function title(block) {
    const tag = block.options.tag || 'h1'
    const styles = block.options.styles
    return row(col(`<${tag}>${block.value}</${tag}>`))
}
function text(block) {
    return row(col(`<p>${block.value}</p>`))
}
function columns(block) {
    const html = block.value.map(item => col(item)).join('')
    return row(html)
}
function image(block) {
    return row(`<img src="${block.value}">`)

}

export const templates = {title, text, columns, image}