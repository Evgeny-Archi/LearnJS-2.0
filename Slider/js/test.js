import { Slider } from './slider.js'

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
