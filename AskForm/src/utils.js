export function isValid(value) {
   return value.length >= 10 ? true : false
}

export function createModal(title, content) {
   const modal = document.createElement('div')
   modal.classList.add('modal')
   
   modal.innerHTML = `
   <div class="mui--text-headline">${title}</div>
   <div class="modal-content">${content}</div>
   `
   mui.overlay('on', modal)
}