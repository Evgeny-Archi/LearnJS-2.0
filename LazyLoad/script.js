(function() {
    'use strict'

    const imgItems = document.querySelectorAll('.page__image')
    const lazyMapWrap = document.querySelector('.page__map')
    const loadMoreWrap = document.querySelector('.js-load-more')
    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 1.0
    }

    // Lazy images
    function lazyImages(entries, observer) {
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
    const observerImg = new IntersectionObserver(lazyImages, options)
    imgItems.forEach(item => observerImg.observe(item))

    // Lazy map
    function lazyMap(entries, observer) {
        if (entries[0].intersectionRatio <= 0) return
        lazyMapWrap.querySelector('svg').remove()
        lazyMapWrap.insertAdjacentHTML('afterbegin', `
        <iframe src="${lazyMapWrap.dataset.map}" width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        `)
        observer.unobserve(lazyMapWrap)
    }
    const observerMap = new IntersectionObserver(lazyMap, options)
    observerMap.observe(lazyMapWrap)

    // Infinite load
    function loadMore(entries, observer) {
        if (entries[0].intersectionRatio <= 0) return
        console.log(entries)
        loadMoreWrap.insertAdjacentHTML('beforeend', '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-notch" class="load-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"></path></svg>')

    }
    const observerMore = new IntersectionObserver(loadMore, options)
    observerMore.observe(loadMoreWrap)
})()