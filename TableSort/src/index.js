import {Model} from './module/model'
import {View} from './module/view'
import {Controller} from './module/controller'
import {Popup} from './module/popup'
import {Modal} from './module/modal'

const model = new Model()
const view = new View()
const popup = new Popup()
const modal = new Modal()
const controller = new Controller(model, view, popup, modal)