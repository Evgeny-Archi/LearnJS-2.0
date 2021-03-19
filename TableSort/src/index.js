import {Model} from './model'
import {View} from './view'
import {Controller} from './controller'
import {Popup} from './module/popup'
import {ModalAbout} from './module/modalAbout'
import {ModalEdit} from './module/modalEdit'

const model = new Model()
const view = new View()
const popup = new Popup()
const about = new ModalAbout()
const edit = new ModalEdit()
const controller = new Controller(model, view, popup, about, edit)