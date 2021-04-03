(function() {
    'use strict'

    const lazyImages = document.querySelectorAll('img[data-src]')
    const windowHeight = document.documentElement.clientHeight

    console.log(windowHeight)
    console.log(lazyImages[0].getBoundingClientRect(), pageYOffset)
})()