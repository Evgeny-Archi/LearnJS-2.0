const sliderInit = (function () {
    return function(target) {
        const mainSlider = document.querySelector(target),
              slider = mainSlider.querySelector('.slider__wrap'),
              images = mainSlider.querySelectorAll('.slider__item'),
              sliderControls = mainSlider.querySelectorAll('.slider-button'),
              sliderCounts = mainSlider.querySelector('.slider-counts')
        let transform = 0
        let count = 0;

        const init = () => {
            sliderWrapWidth = parseFloat(getComputedStyle(slider).width)

            images.forEach(item => {
                item.style.width = sliderWrapWidth + 'px'
                item.style.height = 'auto'
            })
            sliderCounts.innerHTML = `1 / ${images.length}`
        }
        init()
        window.addEventListener('resize', init)

        const getTransform = (direction) => {
            if (direction === 'left') {
                if (count <= 0) {
                    count = images.length - 1
                    transform = -count * sliderWrapWidth
                } else {
                    count--;
                    transform += sliderWrapWidth
                }
                
            } else {
                if (count >= images.length - 1) {
                    count = 0
                    transform = 0
                } else {
                    count++;
                    transform -= sliderWrapWidth
                }
                
            }
            slider.style.transform = `translateX(${transform}px)`
            sliderCounts.innerHTML = `${count + 1} / ${images.length}`
        }

        const setControl = (event) => {
            event.preventDefault()
            let target = event.target
            if (target.classList.contains('slider-button') || target.closest('.slider-button')) {
                let clickDirection = target.classList.contains('btn-left') ? 'left' : 'right'
                getTransform(clickDirection)
            }
        }

        sliderControls.forEach((item) => {
            item.addEventListener('click', setControl)
        })
    }
})()

const slider = sliderInit('.slider')