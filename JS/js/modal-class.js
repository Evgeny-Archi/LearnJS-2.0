window.addEventListener("DOMContentLoaded", () => {
  class Modal {
    constructor(id = "") {
      (this.id = id), (this.modal = document.querySelector(`#${this.id}`));
    }
    getScrollBarWidth() { // Получаем ширину скролла для стиля в боди, чтобы модалка не прыгала при overflow = hidden
        const item = document.createElement('div');
        item.style.position = 'absolute';
        item.style.top = '-9999px';
        item.style.width = '50px';
        item.style.height = '50px';
        item.style.overflow = 'scroll';
        item.style.visibility = 'hidden';

        document.body.appendChild(item);
        const boxScrollWidth = item.offsetWidth - item.clientWidth;
        document.body.removeChild(item);

        return boxScrollWidth;
    }
    toggleBodyOverflow(action) { // Переключаем возможность скролла страницы
        switch (action) {
            case 'hide': 
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = `${this.getScrollBarWidth()}px`; // Добавляем паддинг странице на ширину скрытого скролла, чтобы модалка не прыгала
                break;
            case 'show':
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                break;
        }
        
    }
    showModal() {
      if (!this.modal) return false; // Если не был передан id (нет модалки в DOM), останавливаем, чтобы не показывало ошибку

      this.toggleBodyOverflow('hide'); // Отключаем скролл

      this.modal.classList.add('active');
    }
    closeModal() {
        // Фу-ция для прослушки завершения transition при скрытии модалки и показа скролла (чтоб модалка не прыгала)
        const showScroll = (event) => { 
            if (event.propertyName === 'transform') {
                this.toggleBodyOverflow('show'); // Показываем скролл
                this.modal.removeEventListener('transitionend', showScroll) // Удаляем слушатель, ибо при повторном открытии модалки скролл появляется
            }
        }
        this.modal.addEventListener('transitionend', showScroll) // Слушатель завершения анимации скрытия модалки и показа скролла
        this.modal.classList.remove('active');
    }
  }

  document.addEventListener("click", (event) => {
    // open
    if (
      event.target.closest(".modal-link") ||
      event.target.classList.contains("modal-link")
    ) {
      event.preventDefault();

      const target = event.target.closest(".modal-link");
      const modal = new Modal(target.getAttribute("href").replace("#", ""));
      modal.showModal();
    }

    // close
    if (event.target.classList.contains('active') || event.target.closest('.btn-close')) {
        event.preventDefault();

        const modal = new Modal(event.target.closest('.active').id);
        modal.closeModal()
    }
  });
});
