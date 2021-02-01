export class Slider {
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
        
    }

     
}
