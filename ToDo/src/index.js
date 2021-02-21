import Model from './model'
import View from './view'
import Controller from './controller'
import { load } from './helper'

const state = load()

const model = new Model(state || undefined)
const view = new View()
const controller = new Controller(model, view)

