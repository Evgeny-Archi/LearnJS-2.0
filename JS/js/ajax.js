const gallery = document.querySelector('.gallery')
const openMore = document.getElementById('btn')

const generateGallery = () => {
  const request = new XMLHttpRequest()
  request.open('GET', './js/ajax.json')
  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  request.send()

  request.addEventListener('load', function() {

    if (request.readyState === 4 && request.status === 200) {
      let obj = JSON.parse(request.response)
      createList(obj.img);

    } else {
      const errorDiv = document.createElement('div')
      errorDiv.classList.add('error')
      errorDiv.textContent = 'Error! Images can not load'
      gallery.appendChild(errorDiv)
    }
  })

  const createList = (arr) => {
    arr.map((elem) => {
      const galleryItem = document.createElement('img')
      galleryItem.setAttribute('src', elem)
      galleryItem.classList.add('gallery-item')
      gallery.append(galleryItem)
    })
  }

}
openMore.addEventListener('click', generateGallery)
generateGallery()