import image from './assets/image.png'
import {TitleBlock, TextBlock, ColumnsBlock, ImageBlock} from './classes/block'

const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, laborum.'

export const model = [
    new TitleBlock('Конструктор сайтов', {
        tag: 'h2',
        styles: {
            background: 'grey',
            color: '#fff',
            'text-align': 'center',
            padding: '1.5rem'
        }
    }),
    new ImageBlock(image, {
        styles: {
            padding: '2rem 2rem',
            display: 'flex',
            'justify-content': 'center'
        },
        imageStyles: {
            width: '800px',
            height: 'auto'
        },
        alt: 'this is image'
    }),
    new ColumnsBlock(['column 1', 'column 2', 'column 3'], {
        styles: {
            background: '#ccc',
            color: '#fff',
            'text-align': 'center'
        }
    }),
    new TextBlock(text, {
        tag: 'p',
        styles: {
            padding: '1rem',
            border: '1px solid #ccc'
        }
    })
]