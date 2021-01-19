/* Preloader */

(function preloader() {
    const preloaderId = setInterval(() => {
        
        if (document.readyState == 'complete') {
            clearInterval(preloaderId)
            // document.body.classList.add('loaded')
            document.body.style.opacity = 1
        }
    }, 500)
})()
    
// window.onload = () => {
//     const preloaderPromise = () => {
//         return new Promise((resolve, reject) => {
//             setTimeout(resolve, 1000)
//         })
//     }

//     preloaderPromise()
//         .then(() => {
//             const preloader = document.querySelector('.preloader')
//             preloader.style.opacity = '0'
//             document.body.classList.add('loaded')
//         })
// }

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
          dots = dotsWrap.querySelectorAll('.header-slider__buttons--dot');

    // Системные переменные
    let slideIndex = 0, // Номер начального слайда
        autoSlide = true, // Авто переключение слайдов
        progressBar = autoSlide, // Строка прогресса переключения (работает, если вкл Авто переключение). Выкл - false
        scaleAnimation = true, // Анимация приближения слайда
        scaleAnimationTimer = 7; // Продолжительность анимации

    renderSlides(slideIndex)

    function renderSlides(n) {
        // Проверяем последний и начальный слайд для цикличного переключения
        if (n > sliderItems.length - 1) {
            slideIndex = 0
        } 
        if (n < 0) {
            slideIndex = sliderItems.length - 1
        }

        // Обновляем слайды и кнопки
        sliderItems.forEach((item, index) => {
            item.style.zIndex = 0
            item.style.opacity = 0
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
