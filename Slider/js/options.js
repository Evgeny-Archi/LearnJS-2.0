/* Настройки слайдера. Получение и добавление */
class sliderOptions {
    constructor(form) {
        this.formWrap = document.querySelector(form);
        
    }
}

const setSliderOptions = (function(form) {

    const formWrap = document.querySelector(form),
          autoplay = formWrap.querySelector(`#autoplay`),
          progressBar = formWrap.querySelector('#progress_bar'),
          scaleSlider = formWrap.querySelector('#scale_slider'),
          slideIndex = formWrap.querySelector('#slide_index'),
          autoplayTimer = formWrap.querySelector('#autoplay_timer'),
          scaleSliderTimer = formWrap.querySelector('#scale_slider_timer'),
          statusOutWrap = document.querySelector('.status-message-out');
    
    (function listeners() {
        autoplay.addEventListener('change', (event) => {
            checkHandler(event.target, progressBar, autoplayTimer)
        })
        scaleSlider.addEventListener('change', (event) => {
            checkHandler(event.target, scaleSliderTimer)
        })
    
        // Управление чекбоксами и селектами
        const checkHandler = (target, ...args) => {
            if (!target.checked) {
                args.map(item => {
                    if (item.nodeName === 'INPUT' && item.type === 'checkbox') {
                        item.checked = false
                    }
                    item.setAttribute('disabled', 'disabled')
                })
            } else {
                args.map(item => item.removeAttribute('disabled'))
            }
        }
    })()

    formWrap.addEventListener('submit', (event) => {
        event.preventDefault()

        const options = {
            autoplay: autoplay.checked,
            progressBar: progressBar.checked,
            scaleSlider: scaleSlider.checked,
            sliderIndex: slideIndex.value,
            autoplayTimer: autoplayTimer.value,
            scaleSliderTimer: scaleSliderTimer.value
        }

        try {
            localStorage.setItem('sliderOptions', JSON.stringify(options))
            statusOutWrap.innerHTML = '<span class="success">Данные успешно сохранены</span>'
        } catch (error) {
            console.log(new Error('Localstorage are not supported'))
            statusOutWrap.innerHTML = `<span class="error">Ошибка: ${error.message}</span>`
        }
        
    })
})

const setSliderOptionsInit = setSliderOptions('.side-options')
