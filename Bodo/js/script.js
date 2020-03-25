window.onload = init();

function init() {
  
  // данные навигации
  const openNavBtn = document.querySelector(".header-top__btn");
  const nav = document.querySelector(".header-top__nav");
  const closeNavBtn = document.querySelector(".close-btn");
  const backdrop = document.querySelector(".backdrop");
  
  // Закрытие меню при нажатии на крестик или свободную область
  function closeSideMenu() {
    if (nav.classList.contains("opened")) {
      nav.classList.remove("opened");
      backdrop.classList.remove("on");
    }
  }

  // Эффект печатной машинки в заголовке
  function typed() {
    let typedOut = document.querySelector(".header-top__text");
    let typedText = [
      "My name is Evgeny",
      "Im a frontend developer",
      "Love material"
    ];
    let line = 0; // Счетчик индекса массива
    let i = 0;

    function type() {
      setTimeout(() => {
        if (line < typedText.length) {
          if (i < typedText[line].length) {
            typedOut.textContent += typedText[line][i];
            i++;

            type();
          } else {
            line++;
            i = 0;
            typedOut.textContent = "";
           
            type();
          }
        } else {
            typedOut.textContent = typedText[line - 1];
        } 
      }, 100);
    }
    type();
  }
  typed();

  openNavBtn.onclick = () => {
    nav.classList.add("opened");
    document.querySelector(".backdrop").classList.add("on");
  };

  // Закрытие меню при нажатии на крест или свободную область
  backdrop.onclick = closeSideMenu;
  closeNavBtn.onclick = closeSideMenu;

  // Слайдер
  const sliderInit = (function() {
    return function(selector) {
      const mainElement = document.querySelector(selector);
      const mainWrap = mainElement.querySelector('.about__info-wrap');
      const sliderItems = mainElement.querySelectorAll('.about__info-item');
      const wrapWidth = parseFloat(getComputedStyle(mainWrap).width);
      const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width);
      const linkWrap = mainElement.querySelector('.about__info-btn');
      const step = (itemWidth / wrapWidth) * 100; // шаг прокрутки в зависимости от кол-ва слайдов на странице
      let transform = 0;
      let currentIndicator; // присваивается выбранная кнопка для удаления подсветки у других

      // Создаем кнопки в зависимости от кол-ва элементов слайдера
      const createSliderControls = () => {
        
        for (let i = 0; i < sliderItems.length; i++) {
          let link = document.createElement('a');
          link.href = '#';
          link.classList.add('about__info-btn-item');
          if (i === 0) { // первому элементу добавляем подсветку
            link.classList.add('active');
          }
          link.setAttribute('data-order', i); // добавляем data аттрибут с числом i
          linkWrap.append(link);
        }
        
      }

      function clickControl(event) {          
        let click = event.target;        
        
        if (click.classList.contains('about__info-btn-item')) { // Если тыкаем на кнопки, а не мимо, то выполняем
          event.preventDefault();
          let indexIndicator = mainElement.querySelector('.about__info-btn-item');  // получаем первую кнопку
          let dataToSlide = parseInt(click.getAttribute('data-order')); // получаем число нажатой кнопки
          transform = dataToSlide * step; // считаем прокрутку в зависимости от цифры у нажатой кнопки и кол-ва слайдов на странице

          if(indexIndicator.classList.contains('active')) { // удаляем подсветку у первой кнопки
            indexIndicator.classList.remove('active');
          }
          if(currentIndicator) { // удаляем подсветку у других кнопок, если есть
            currentIndicator.classList.remove('active');
          }
  
          currentIndicator = click; // присваиваем текущую кнопку для добавления подсветки
          currentIndicator.classList.add('active');

          itemTransform(transform);
        }
      }
 
      function itemTransform(transform) {        
        if (transform === 0) {  // возвращаем к первому слайду (не обязательно, просто убирает аттрибут стилей если нажата первая кнопка)
          mainWrap.removeAttribute('style');
          return;
        }        

        mainWrap.style.transform = `translateX(-${transform}%)`;
      }

      createSliderControls(); // Создаем кнопки

      linkWrap.addEventListener('click', (event) => { // Делегируем событие обертке кнопок
        clickControl(event);
      });      

    }
  }());

  const miniSlider = sliderInit('.about__info');

  // Галерея
  class Galery {
    constructor(section) {
      this.galeryWrap = document.querySelector(section);
      this.galeryItems = this.galeryWrap.querySelectorAll('.section-content__item');       
    }

    listener() {
      this.galeryItems.forEach(item => {
        item.addEventListener('click', () => {
          event.preventDefault();
          this.createModal(item);
        })
      })
    }

    createModal(item) {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.insertAdjacentHTML('afterbegin', 
        `<div class="modal-wrap">
              <div class="modal__content">
                  <img src="${item.href}" alt="" class="modal__img">
                  <button class="modal__close-button"><i class="material-icons">clear</i></button>
                  <span class="modal__bottom">1 of 6</span>
              </div>
              <div class="modal__button left-button">
                  <span></span>
              </div>
              <div class="modal__button right-button">
                  <span></span>
              </div>
          </div>`
      )
      document.body.append(modal);
      document.body.classList.add('modal-on');
    }

  }

  const galeryInit = new Galery('.work-modal');
  galeryInit.listener();

}







