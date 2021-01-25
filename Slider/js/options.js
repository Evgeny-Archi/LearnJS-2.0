const setSliderOptions = (function(form) {
    const formWrap = document.querySelector(form),
          autoplay = formWrap.querySelector('#autoplay'),
          progressBar = formWrap.querySelector('#progress_bar')

    autoplay.addEventListener('change', (event) => {
        if (!event.target.checked) {
            progressBar.checked = false
            progressBar.setAttribute('disabled', 'disabled')
        } else {
            progressBar.removeAttribute('disabled')
        }
    })
})

const setSliderOptionsInit = setSliderOptions('.side-options')
