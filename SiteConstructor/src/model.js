import image from './assets/image.png'

export const model = [
    { type: 'title', value: 'Конструктор сайтов', options: {
            tag: 'h2',
            styles: 'background: grey; color: #fff;'
        } },
    { type: 'text', value: 'some text' },
    { type: 'columns', value: [
            '1111',
            '2222',
            '33333',
            '4444'
        ] },
    { type: 'image', value: image }
]