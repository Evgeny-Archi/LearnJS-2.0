(function() {
    'use strict'

    const imgItems = document.querySelectorAll('.page__image')
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    }

    function lazyScroll(entries, observer) {
        if (entries[0].intersectionRatio <= 0) return
        entries.forEach(entry => {
            entry.target.querySelector('svg').remove()

            const image = entry.target.querySelector('img[data-src]')
            image.style.display = 'block'
            image.src = image.dataset.src
            image.removeAttribute('data-src')

            observer.unobserve(entry.target)
        })
    }
    const observer = new IntersectionObserver(lazyScroll, options)
    imgItems.forEach(item => observer.observe(item))
})()