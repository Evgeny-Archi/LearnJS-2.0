/* Preloader */
(function preloader() {
    const preloaderId = setInterval(() => {
        
        if (document.readyState == 'complete') {
            clearInterval(preloaderId)
            document.body.style.opacity = 1
        }
    }, 200)
})()

/* Sticky navigation with intersection observer */
const stickyNavigation = (function(nav) {
    const navBar = document.querySelector(nav)
    const trigger = document.querySelector('.trigger')

    const options = {
        root: null,
        rootMargin: '100px 0px 0px 0px',
        threshold: 1.0
    }

    const handler = (entries) => {
        if (!entries[0].isIntersecting) {
            navBar.classList.add('sticky')
        } else {
            navBar.classList.remove('sticky')
            observer.unobserve(navBar)
        }
    }
    const observer = new window.IntersectionObserver(handler, options)
    observer.observe(trigger)
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
