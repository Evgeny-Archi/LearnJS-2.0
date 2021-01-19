/* Preloader */
(function preloader() {
    const preloaderId = setInterval(() => {
        
        if (document.readyState == 'complete') {
            clearInterval(preloaderId)
            document.body.style.opacity = 1
        }
    }, 200)
})()

/* Sticky navigation */
const stickyNavigation = (function(nav) {
    const navBar = document.querySelector(nav)

    const scrollListener = function() {
        if (window.pageYOffset >= navBar.offsetTop + 200) {
            navBar.classList.add('sticky')
        } else {
            navBar.classList.remove('sticky')
        }
    }

    window.addEventListener('scroll', scrollListener)
})
const stickyNavigationInit = stickyNavigation('.header-top')

/* Slider */
const slider = (function(slider) {

    // Получаем элементы со страницы
    const mainSlider = document.querySelector(slider),
          sliderItems = mainSlider.querySelectorAll('.header-slider__item'),
          sliderItemsBg = mainSlider.querySelectorAll('.header-slider__item--bg'),
          nextButton = mainSlider.querySelector('.header-slider__arrow--right'),
          prevButton = mainSlider.querySelector('.header-slider__arrow--left'),
          dotsWrap = mainSlider.querySelector('.header-slider__buttons'),
          dots = renderDots(dotsWrap);

    // Системные переменные
    let slideIndex = 0, // Номер начального слайда
        autoSlide = false, // Авто переключение слайдов
        autoSlideTime = 7000, // Время переключения слайдов в авто режиме (ms)
        progressBar = autoSlide, // Строка прогресса переключения (работает, если вкл Авто переключение). Выкл - false
        scaleAnimation = true, // Анимация приближения слайда
        scaleAnimationTimer = 7; // Продолжительность анимации (s)

    // Проверка на наличие слайдов
    sliderItems.length === 0 ? placeholder() : renderSlides(slideIndex)

    // Запускаем авто переключение слайдов, если опция вкл
    autoSlide ? startAutoplay(autoSlideTime) : stopAutoplay()

    function placeholder() {
        mainSlider.innerHTML = '<h1 class="header-slider__placeholder">No images</h1>'
    }

    function renderSlides(n) {
        // Проверяем последний и начальный слайд для цикличного переключения
        if (n > sliderItems.length - 1) {
            slideIndex = 0
        } 
        if (n < 0) {
            slideIndex = sliderItems.length - 1
        }

        // Обновляем слайды и кнопки
        sliderItems.forEach((item) => {
            item.style.zIndex = 0
            item.style.opacity = 0 // Прозрачность нужна для плавной смены слайдов
        })
        dots.forEach(item => item.classList.remove('active'))
        if (scaleAnimation) { // Убираем анимацию увеличения слайда, если опция включена
            sliderItemsBg.forEach(item => item.style.animation = '')
        }

        // Делаем активным текущий слайд и кнопку
        sliderItems[slideIndex].style.zIndex = 1
        sliderItems[slideIndex].style.opacity = 1
        dots[slideIndex].classList.add('active')
        if (scaleAnimation) {  // Добавляем анимацию увеличения слайда, если опция включена
            sliderItemsBg[slideIndex].style.animation = `animate ${scaleAnimationTimer}s ease-in-out 0s 1 normal forwards`
        }
    }

    // Фу-ция добавления кнопок в зависимости от кол-ва слайдов на страницу и возвращает Node лист элементов
    function renderDots(wrap) {
        let dots = ''
        for (let i = 0; i < sliderItems.length; i++) {
            dots += '<a href="" class="header-slider__buttons--dot"></a>'
        }
        wrap.innerHTML = dots
        return wrap.querySelectorAll('.header-slider__buttons--dot')
    }

    // Фу-ция авто переключения слайдов
    function startAutoplay(ms) {
        let autoSlide = setInterval(() => {
            nextSlide(1)
        }, ms)
    }

    function stopAutoplay() {
        clearInterval(autoSlide)
        autoSlide = false
    }
 
    // Фу-ция переключения вперед - назад
    function nextSlide(n) {
        slideIndex += n
        renderSlides(slideIndex)
    }
    // Фу-ция переключения кнопками
    function currentSlide(n) {
        renderSlides(slideIndex = n)
    }

    // Обработчики событий на кнопки
    (function listeners() {
        nextButton.addEventListener('click', (event) => {
            nextSlide(1)
        })
        prevButton.addEventListener('click', (event) => {
            nextSlide(-1)
        })

        dotsWrap.addEventListener('click', (event) => {
            event.preventDefault()
            for (let i = 0; i < dots.length; i++) {
                if (event.target.classList.contains('header-slider__buttons--dot') && event.target == dots[i]) {
                    currentSlide(i)
                }
            }
        })
    })()
})

const slidetInit = slider('.header-slider')
