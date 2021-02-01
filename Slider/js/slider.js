/* Slider */

class Slider {
    constructor(slider) {
        this.mainSlider = document.querySelector(slider);
        this.sliderItems = this.mainSlider.querySelectorAll('.header-slider__item');
        this.sliderItemsBg = this.mainSlider.querySelectorAll('.header-slider__item--bg');
        this.nextButton = this.mainSlider.querySelector('.header-slider__arrow--right');
        this.prevButton = this.mainSlider.querySelector('.header-slider__arrow--left');
        this.dotsWrap = this.mainSlider.querySelector('.header-slider__buttons');
        this.dots = this.renderDots(this.dotsWrap);
        this.progressBar = this.mainSlider.querySelector('.header-slider__progressbar');

        // Настройки слайдера и системные переменные
        this._sliderIndex = 0; // Номер начального слайда
        this._autoSlide = true; // Авто переключение слайдов
        this._isProgressBar = this._autoSlide; // Строка прогресса переключения (работает, если вкл Авто переключение). Выкл - false
        this._autoSlideTime = 7000; // Время переключения слайдов в авто режиме (ms)
        this._scaleAnimation = true; // Анимация увеличения слайда
        this._scaleAnimationTimer = 7; // Продолжительность анимации (s)
        this._progressBarNode = null; // Служит для обновления анимации
    }

    // _sliderIndex getter
    get sliderIndex() {
        if (localStorage.getItem('sliderOptions')) {
            return Number(this.getOptionFromStorage('sliderIndex')) - 1
        } else {
            return this._sliderIndex
        }
    }
    set sliderIndex(value) {
        this._sliderIndex = value
    }

    // _autoSlide getter
    get autoSlide() {
        if (localStorage.getItem('sliderOptions')) {
            return Boolean(this.getOptionFromStorage('autoplay'))
        } else {
            return this._autoSlide
        }
    }
    set autoSlide(value) {
        this._autoSlide = value
    }

    // _isProgressBar getter
    get isProgressBar() {
        if (localStorage.getItem('sliderOptions')) {
            return Boolean(this.getOptionFromStorage('progressBar'))
        } else {
            return this._isProgressBar
        }
    }
    set isProgressBar(value) {
        this._isProgressBar = value
    }

    // _autoSlideTime getter
    get autoSlideTime() {
        if (localStorage.getItem('sliderOptions')) {
            return Number(this.getOptionFromStorage('autoplayTimer'))
        } else {
            return this._autoSlideTime
        }
    }
    set autoSlideTime(value) {
        this._autoSlideTime = value
    }

    // _scaleAnimation getter
    get scaleAnimation() {
        if (localStorage.getItem('sliderOptions')) {
            return Boolean(this.getOptionFromStorage('scaleSlider'))
        } else {
            return this._scaleAnimation
        }
    }
    set scaleAnimation(value) {
        this._scaleAnimation = value
    }

    // _scaleAnimationTimer getter
    get scaleAnimationTimer() {
        if (localStorage.getItem('sliderOptions')) {
            return Number(this.getOptionFromStorage('scaleSliderTimer'))
        } else {
            return this._scaleAnimationTimer
        }
    }
    set scaleAnimationTimer(value) {
        this._scaleAnimationTimer = value
    }

    // Получаем настройки слайдера из хранилища
    getOptionFromStorage(option) {
        return JSON.parse(localStorage.getItem('sliderOptions'))[option]
    }

    renderDots(wrap) {
        let dots = ''
        for (let i = 0; i < this.sliderItems.length; i++) {
            dots += '<a href="" class="header-slider__buttons--dot"></a>'
        }
        wrap.innerHTML = dots
        return wrap.querySelectorAll('.header-slider__buttons--dot')
    }

    renderSlides(n) {
        this.refreshAndCheckOptions()

        // Проверяем последний и начальный слайд для цикличного переключения
        if (n > this.sliderItems.length - 1) {
            this._sliderIndex = n
        } 
        if (n < 0) {
            this._sliderIndex = this.sliderItems.length - 1
        }

        // Делаем активным текущий слайд и кнопку
        this.sliderItems[this._sliderIndex].style.zIndex = 1
        this.sliderItems[this._sliderIndex].style.opacity = 1
        this.dots[this._sliderIndex].classList.add('active')
        if (this._scaleAnimation) {  // Добавляем анимацию увеличения слайда, если опция включена
            this.sliderItemsBg[this._sliderIndex].style.animation = `animateScale ${this._scaleAnimationTimer}s ease-in-out 0s 1 normal forwards`
        }
        if (this.autoSlide) {
            this.mainSlider.appendChild(this._progressBarNode)
            this.progressBar.style.animation = `animate-progress-bar ${this._autoSlideTime / 1000}s linear 1`
        }
    }

    refreshAndCheckOptions() {
         // Проверяем включен ли прогресс бар
        if (!this._isProgressBar) this.progressBar.style.display = 'none'
        // Обновляем слайды и кнопки
        this.sliderItems.forEach((item) => {
            item.style.zIndex = 0
            item.style.opacity = 0 // Прозрачность нужна для плавной смены слайдов
        })
        this.dots.forEach(item => item.classList.remove('active'))
        if (this._scaleAnimation) { // Убираем анимацию увеличения слайда после переключения слайда
            this.sliderItemsBg.forEach(item => item.style.animation = '')
        }
        if (this._autoSlide) {
            this._progressBarNode = this.mainSlider.removeChild(this.progressBar)
        }
    }

     // Фу-ция переключения вперед - назад
     nextSlide(n) {
        this.renderSlides(this._slideIndex += n)
    }
    // Фу-ция переключения кнопками
    currentSlide(n) {
        this.renderSlides(this._slideIndex = n)
    }
}
const slider = new Slider('.header-slider')

slider.nextButton.addEventListener('click', (event) => {
    slider.nextSlide(1)
})
slider.prevButton.addEventListener('click', (event) => {
    slider.nextSlide(-1)
})

slider.dotsWrap.addEventListener('click', (event) => {
    event.preventDefault()
    for (let i = 0; i < slider.dots.length; i++) {
        if (event.target.classList.contains('header-slider__buttons--dot')) {
            slider.currentSlide(i)
        }
    }
})
