// Конвертируем байты
function bytesToSize(bytes) {
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb']
    if (!bytes) return '0 Byte'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
 }
 // Обрезаем имя файла, если в нем больше 12 символов
 function cutText(str) {
    if (str.length < 12) return str
    let ext = str.match(/\.[0-9a-z]+$/i)
    return str.slice(0, 12).concat('..', ext[0])
}

function createElem(tag, classes = [], content) {
    const node = document.createElement(tag)
    if (classes.length) {
        node.classList.add(...classes)
    }
    if (content) {
        node.textContent = content
    }
    return node
}

function clearBlock(item) {
    item.innerHTML = '<div class="preview-info-progress"></div>'
    item.style.bottom = '0px'
}

function noop() {}

export function upload(selector, options = {}) {
    const onUpload = options.onUpload || noop
    const input = document.querySelector(selector)
    const preview = document.querySelector('.preview')
    let files = [] // Глобальная переменная для доступа к добавленным картинкам

    // Создаем псевдо-кнопку
    const openButton = createElem('button', ['btn'], 'Открыть')
    input.insertAdjacentElement('afterend', openButton)
    const uploadButton = createElem('button', ['btn', 'primary'], 'Загрузить')
    openButton.insertAdjacentElement('afterend', uploadButton)
    uploadButton.style.display = 'none'

    // Настройка инпута
    if (options.multi) {
        input.setAttribute('multiple', true)
    }
    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    // Эмулируем нажатие кнопки для открытия окна выбора файлов
    const triggerInput = () => input.click()

    // Фу-ция отрисовки превью картинок
    const changeHandler = (event) => {
        if (!event.target.files.length) return

        preview.innerHTML = '' // Обновляем превью картинок (очищаем предыдущий результат)
        uploadButton.style.display = 'inline'

        files = Array.from(event.target.files)

        files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }
            const reader = new FileReader()

            reader.readAsDataURL(file)

            // Читаем файлы и добавляем на страницу превью
            reader.onload = (ev) => {
                let src = ev.target.result // Получаем картинку в формате base64
                
                preview.insertAdjacentHTML('afterbegin', `
                <div class="preview-image">
                    <div class="preview-remove" data-name="${file.name}">&times;</div>
                    <img src="${src}" alt="${file.name}">
                    <div class="preview-info">
                        <span class="preview-info__name">${cutText(file.name)}</span>
                        <span class="preview-info__size">${bytesToSize(file.size)}</span>
                    </div>
                    <div class="output-url"></div>
                </div>
                `)
            }
        })
    }

    const removeHandler = (event) => {
        if (!event.target.dataset.name) {
            return
        }
        const { name } = event.target.dataset // Получаем имя картинки из дата атрибута кнопки
       
        files = files.filter(file => file.name !== name)
        const block = preview.querySelector(`[data-name="${name}"]`).parentNode
        block.classList.add('removing')
        block.addEventListener('transitionend', () => {
            block.remove()
        })

        if (!files.length) {
            uploadButton.style.display = 'none' // Скрываем кнопку Загрузить, если удалены все картинки
        }
    }

    const uploadHandler = () => {
        preview.querySelectorAll('.preview-remove').forEach(item => item.remove()) // Убираем кнопки удаления во время загрузки
        const outputUrl = preview.querySelectorAll('.output-url')
        const previewInfo = preview.querySelectorAll('.preview-info')
        previewInfo.forEach(item => clearBlock(item)) // Меняем строку с информацией на полосу загрузки
        onUpload(files, previewInfo, outputUrl)
    }

    openButton.addEventListener('click', triggerInput) // Перенаправляем клик с псевдо-кнопки на инпут выбора файлов
    input.addEventListener('change', changeHandler) // Получаем картинки
    preview.addEventListener('click', removeHandler) // Удаляем картинку
    uploadButton.addEventListener('click', uploadHandler) // Загружаем картинки
}