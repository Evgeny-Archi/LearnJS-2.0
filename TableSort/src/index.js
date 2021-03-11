import {Model} from './module/model'
import {View} from './module/view'
import {Controller} from './module/controller'

const model = new Model()
const view = new View()
const controller = new Controller(model, view)

