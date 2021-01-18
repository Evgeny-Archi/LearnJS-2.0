const slider = (function(slider) {

    // Получаем элементы со страницы
    const mainSlider = document.querySelector(slider),
          sliderItems = mainSlider.querySelectorAll('.header-slider__item'),
          nextButton = mainSlider.querySelector('.header-slider__arrow--right'),
          prevButton = mainSlider.querySelector('.header-slider__arrow--left'),
          dotsWrap = mainSlider.querySelector('.header-slider__buttons'),
          dots = dotsWrap.querySelectorAll('.header-slider__buttons--dot');

    // Системные переменные
    let slideIndex = 1, // Номер начального слайда
        autoSlide = true, // Авто переключение слайдов
        progressBar = autoSlide, // Строка прогресса переключения (работает, если вкл Авто переключение). Выкл - false
        scaleAnimation = true; // Анимация приближения слайда

    renderSlides(slideIndex)

    function renderSlides(n) {
        // Проверяем последний и начальный слайд для цикличного переключения
        if (n > sliderItems.length) {
            slideIndex = 1
        } 
        if (n < 1) {
            slideIndex = sliderItems.length
        } 

        // Обновляем слайды и кнопки
        sliderItems.forEach(item => item.style.zIndex = 0)
        dots.forEach(item => item.classList.remove('active'))

        // Делаем активным текущий слайд и кнопку
        sliderItems[slideIndex - 1].style.zIndex = 1
        dots[slideIndex - 1].classList.add('active')
    }

    // Фу-ция переключения вперед - назад
    function nextSlide(n) {
        renderSlides(slideIndex += n)
    }
    // Фу-ция переключения кнопками
    function currentSlide(n) {
        console.log(n);
        renderSlides(slideIndex = n)
    }

    // Обработчики событий на кнопки
    (function listeners() {
        nextButton.addEventListener('click', () => {
            nextSlide(1)
        })
        prevButton.addEventListener('click', () => {
            nextSlide(-1)
        })

        dotsWrap.addEventListener('click', (event) => {
            for (let i = 0; i < dots.length + 1; i++) {
                if (event.target.classList.contains('header-slider__buttons--dot') && event.target == dots[i - 1]) {
                    currentSlide(i)
                }
            }
        })
    })()
})

const init = slider('.header-slider')
