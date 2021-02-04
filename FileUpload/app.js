import { upload } from './upload.js'
import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAe7NkR6X55fESJOCmKAnW6U6ecR7RsPV4",
    authDomain: "fe-upload-347ee.firebaseapp.com",
    projectId: "fe-upload-347ee",
    storageBucket: "fe-upload-347ee.appspot.com",
    messagingSenderId: "389359323046",
    appId: "1:389359323046:web:e0da4beadee31ba9e2b167"
  }
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks, outputUrl) {
        files.forEach((file, index) => {
            // Передаем картинку firebase
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            // Отслеживаем состояние загрузки
            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage + '%'
                block.style.width = percentage + '%'
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    outputUrl.forEach(item => {
                        item.innerHTML = `<a href="${url}" target="_blank"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" class="svg-inline--fa fa-external-link-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg></a>`
                    })
                })
            })
        })
    }
})