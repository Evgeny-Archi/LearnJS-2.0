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

/* Side navigation */
const sideNavigation = (function(sideNav) {
    const sideNavWrap = document.querySelector(sideNav),
          openBtn = document.querySelector('.js-sidenav-open'),
          backdrop = document.querySelector('.backdrop'),
          closeBtn = sideNavWrap.querySelector('.header-side__nav--close');

    (function listenters() {
        // Open
        openBtn.addEventListener('click', (event) => {
            if (event.target.closest('.js-sidenav-open') || event.target.closest('.burger')) {
                event.preventDefault()
                open()
            }
        })
        // Close
        document.addEventListener('click', (event) => {
            if (event.target === backdrop || event.target === closeBtn) {
                close()
            }
        })
    })()

    const open = function() {
        backdrop.classList.add('on')
        sideNavWrap.style.transform = 'translateX(0)'
    }

    const close = function() {
        backdrop.classList.remove('on')
        sideNavWrap.style.transform = ''
    }

})
sideNavigationInit = sideNavigation('.header-side__nav')

/* Slider */
const slider = (function(slider) {

    // Получаем элементы со страницы
    const mainSlider = document.querySelector(slider),
          sliderItems = mainSlider.querySelectorAll('.header-slider__item'),
          sliderItemsBg = mainSlider.querySelectorAll('.header-slider__item--bg'),
          nextButton = mainSlider.querySelector('.header-slider__arrow--right'),
          prevButton = mainSlider.querySelector('.header-slider__arrow--left'),
          dotsWrap = mainSlider.querySelector('.header-slider__buttons'),
          dots = renderDots(dotsWrap),
          progressBar = mainSlider.querySelector('.header-slider__progressbar');

    // Системные переменные
    let slideIndex = 0, // Номер начального слайда
        autoSlide = false, // Авто переключение слайдов
        isProgressBar = autoSlide, // Строка прогресса переключения (работает, если вкл Авто переключение). Выкл - false
        autoSlideTime = 7000, // Время переключения слайдов в авто режиме (ms)
        progressBarNode = null, // Служит для обноление анимации
        scaleAnimation = true, // Анимация увеличения слайда
        scaleAnimationTimer = 7; // Продолжительность анимации (s)

    // Проверка на наличие слайдов
    sliderItems.length === 0 ? placeholder() : renderSlides(slideIndex)
    // Запускаем авто переключение слайдов, если опция вкл
    autoSlide ? startAutoplay(autoSlideTime) : stopAutoplay()
    // Проверяем включен ли прогресс бар
    if (!isProgressBar) progressBar.style.display = 'none'

    function placeholder() {
        mainSlider.innerHTML = '<h1 class="header-slider__placeholder">No images</h1>'
    }

    function renderSlides(n) {
        // Обновляем слайды и кнопки
        sliderItems.forEach((item) => {
            item.style.zIndex = 0
            item.style.opacity = 0 // Прозрачность нужна для плавной смены слайдов
        })
        dots.forEach(item => item.classList.remove('active'))
        if (scaleAnimation) { // Убираем анимацию увеличения слайда после переключения слайда
            sliderItemsBg.forEach(item => item.style.animation = '')
        }
        if (autoSlide) {
            progressBarNode = mainSlider.removeChild(progressBar)
        }

        // Проверяем последний и начальный слайд для цикличного переключения
        if (n > sliderItems.length - 1) {
            slideIndex = 0
        } 
        if (n < 0) {
            slideIndex = sliderItems.length - 1
        }

        // Делаем активным текущий слайд и кнопку
        sliderItems[slideIndex].style.zIndex = 1
        sliderItems[slideIndex].style.opacity = 1
        dots[slideIndex].classList.add('active')
        if (scaleAnimation) {  // Добавляем анимацию увеличения слайда, если опция включена
            sliderItemsBg[slideIndex].style.animation = `animateScale ${scaleAnimationTimer}s ease-in-out 0s 1 normal forwards`
        }
        if (autoSlide) {
            mainSlider.appendChild(progressBarNode)
            progressBar.style.animation = `animate-progress-bar ${autoSlideTime / 1000}s linear 1`
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
