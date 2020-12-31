window.addEventListener('DOMContentLoaded', () => {

    class Modal {
        constructor(id = '') {
            this.modal = document.querySelector(id)
        }
        setActive() {
            if (!this.modal) return false
            
            this.modal.classList.add('active')
        }
    }

    document.querySelectorAll('.link').forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.classList.contains('link')) {
                let a = event.target.getAttribute('href');
                const modal = new Modal(a);
                modal.setActive()
            }
        })
    })

})
