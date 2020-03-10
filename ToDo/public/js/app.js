/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Controller {\n  constructor(model, view) {\n    this.model = model;\n    this.view = view;\n\n    view.on(\"add\", this.addTodo.bind(this));\n    view.on(\"toggle\", this.toggleTodo.bind(this));\n    view.on(\"edit\", this.editTodo.bind(this));\n    view.on(\"remove\", this.removeTodo.bind(this));\n\n    view.show(model.state);\n  }\n\n  addTodo(title) {\n    const todo = this.model.addItem({\n      id: Date.now(),\n      title,\n      completed: false\n    });\n\n    this.view.addItem(todo);\n  }\n\n  toggleTodo({ id, completed }) {\n    const todo = this.model.updateItem(id, { completed });\n\n    this.view.toggleItem(todo);\n  }\n\n  editTodo({ id, title }) {\n    const todo = this.model.updateItem(id, { title });\n\n    this.view.editItem(todo);\n  }\n  removeTodo(id) {\n    this.model.removeItem(id);\n    this.view.removeItem(id);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Controller);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udHJvbGxlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb250cm9sbGVyLmpzPzYyODMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKG1vZGVsLCB2aWV3KSB7XG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG5cbiAgICB2aWV3Lm9uKFwiYWRkXCIsIHRoaXMuYWRkVG9kby5iaW5kKHRoaXMpKTtcbiAgICB2aWV3Lm9uKFwidG9nZ2xlXCIsIHRoaXMudG9nZ2xlVG9kby5iaW5kKHRoaXMpKTtcbiAgICB2aWV3Lm9uKFwiZWRpdFwiLCB0aGlzLmVkaXRUb2RvLmJpbmQodGhpcykpO1xuICAgIHZpZXcub24oXCJyZW1vdmVcIiwgdGhpcy5yZW1vdmVUb2RvLmJpbmQodGhpcykpO1xuXG4gICAgdmlldy5zaG93KG1vZGVsLnN0YXRlKTtcbiAgfVxuXG4gIGFkZFRvZG8odGl0bGUpIHtcbiAgICBjb25zdCB0b2RvID0gdGhpcy5tb2RlbC5hZGRJdGVtKHtcbiAgICAgIGlkOiBEYXRlLm5vdygpLFxuICAgICAgdGl0bGUsXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlXG4gICAgfSk7XG5cbiAgICB0aGlzLnZpZXcuYWRkSXRlbSh0b2RvKTtcbiAgfVxuXG4gIHRvZ2dsZVRvZG8oeyBpZCwgY29tcGxldGVkIH0pIHtcbiAgICBjb25zdCB0b2RvID0gdGhpcy5tb2RlbC51cGRhdGVJdGVtKGlkLCB7IGNvbXBsZXRlZCB9KTtcblxuICAgIHRoaXMudmlldy50b2dnbGVJdGVtKHRvZG8pO1xuICB9XG5cbiAgZWRpdFRvZG8oeyBpZCwgdGl0bGUgfSkge1xuICAgIGNvbnN0IHRvZG8gPSB0aGlzLm1vZGVsLnVwZGF0ZUl0ZW0oaWQsIHsgdGl0bGUgfSk7XG5cbiAgICB0aGlzLnZpZXcuZWRpdEl0ZW0odG9kbyk7XG4gIH1cbiAgcmVtb3ZlVG9kbyhpZCkge1xuICAgIHRoaXMubW9kZWwucmVtb3ZlSXRlbShpZCk7XG4gICAgdGhpcy52aWV3LnJlbW92ZUl0ZW0oaWQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/controller.js\n");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/*! exports provided: createElement, EventEmitter, save, load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventEmitter\", function() { return EventEmitter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"save\", function() { return save; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"load\", function() { return load; });\nfunction createElement(tag, props, ...children) {\n  const element = document.createElement(tag);\n\n  Object.keys(props).forEach(key => {\n    if (key.startsWith('data-')) {\n      element.setAttribute(key, props[key]);\n    } else {\n      element[key] = props[key];\n    }\n  });\n\n  children.forEach(child => {\n    if (typeof child === \"string\") {\n      child = document.createTextNode(child);\n    }\n    element.appendChild(child);\n  });\n\n  return element;\n}\n\nclass EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  on(type, callback) {\n    this.events[type] = this.events[type] || [];\n    this.events[type].push(callback);\n  }\n\n  emit(type, arg) {\n    if (this.events[type]) {\n      this.events[type].forEach(callback => callback(arg));\n    }\n  }\n}\n\nfunction save(data) {\n  const string = JSON.stringify(data);\n  localStorage.setItem('todos', string);\n}\n\nfunction load() {\n  const string = localStorage.getItem('todos');\n  const data = JSON.parse(string);\n\n  return data;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaGVscGVyLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlci5qcz82Mjc1Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBwcm9wcywgLi4uY2hpbGRyZW4pIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICBPYmplY3Qua2V5cyhwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmIChrZXkuc3RhcnRzV2l0aCgnZGF0YS0nKSkge1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBwcm9wc1trZXldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudFtrZXldID0gcHJvcHNba2V5XTtcbiAgICB9XG4gIH0pO1xuXG4gIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgIGlmICh0eXBlb2YgY2hpbGQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpO1xuICAgIH1cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmNsYXNzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZXZlbnRzID0ge307XG4gIH1cblxuICBvbih0eXBlLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZXZlbnRzW3R5cGVdID0gdGhpcy5ldmVudHNbdHlwZV0gfHwgW107XG4gICAgdGhpcy5ldmVudHNbdHlwZV0ucHVzaChjYWxsYmFjayk7XG4gIH1cblxuICBlbWl0KHR5cGUsIGFyZykge1xuICAgIGlmICh0aGlzLmV2ZW50c1t0eXBlXSkge1xuICAgICAgdGhpcy5ldmVudHNbdHlwZV0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayhhcmcpKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2F2ZShkYXRhKSB7XG4gIGNvbnN0IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBzdHJpbmcpO1xufVxuXG5mdW5jdGlvbiBsb2FkKCkge1xuICBjb25zdCBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKTtcbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2Uoc3RyaW5nKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlRWxlbWVudCwgRXZlbnRFbWl0dGVyLCBzYXZlLCBsb2FkIH07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/helper.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ \"./src/model.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ \"./src/view.js\");\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller */ \"./src/controller.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\n\n\n\n\nconst state = Object(_helper__WEBPACK_IMPORTED_MODULE_3__[\"load\"])();\n\nconst model = new _model__WEBPACK_IMPORTED_MODULE_0__[\"default\"](state || undefined);\nmodel.on('change', state => Object(_helper__WEBPACK_IMPORTED_MODULE_3__[\"save\"])(state));\n\nconst view = new _view__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nconst controller = new _controller__WEBPACK_IMPORTED_MODULE_2__[\"default\"](model, view);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcbmltcG9ydCB7IHNhdmUsIGxvYWQgfSBmcm9tICcuL2hlbHBlcic7XG5cbmNvbnN0IHN0YXRlID0gbG9hZCgpO1xuXG5jb25zdCBtb2RlbCA9IG5ldyBNb2RlbChzdGF0ZSB8fCB1bmRlZmluZWQpO1xubW9kZWwub24oJ2NoYW5nZScsIHN0YXRlID0+IHNhdmUoc3RhdGUpKTtcblxuY29uc3QgdmlldyA9IG5ldyBWaWV3KCk7XG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIobW9kZWwsIHZpZXcpOyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\n\nclass Model extends _helper__WEBPACK_IMPORTED_MODULE_0__[\"EventEmitter\"] {\n    constructor(state = []) {\n        super();\n        this.state = state;\n    }\n\n    getItem(id) {\n        return this.state.find(item => item.id == id);\n    }\n\n    addItem(item) {\n        this.state.push(item);\n        this.emit('change', this.state);\n        return item;\n    }\n\n    updateItem(id, data) {\n        const item = this.getItem(id);\n        Object.keys(data).forEach(prop => item[prop] = data[prop]);\n        this.emit('change', this.state);\n        return item;\n    }\n\n    removeItem(id) {\n        const index = this.state.findIndex(item => item.id == id);\n\n        if (index > -1) {\n            this.state.splice(index, 1);\n            this.emit('change', this.state);\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Model);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWwuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwuanM/NGFiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuL2hlbHBlcic7XG5cbmNsYXNzIE1vZGVsIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSA9IFtdKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG5cbiAgICBnZXRJdGVtKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09IGlkKTtcbiAgICB9XG5cbiAgICBhZGRJdGVtKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5wdXNoKGl0ZW0pO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuc3RhdGUpO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGlkLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKHByb3AgPT4gaXRlbVtwcm9wXSA9IGRhdGFbcHJvcF0pO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuc3RhdGUpO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGlkKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zdGF0ZS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09IGlkKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/model.js\n");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n\n\nclass View extends _helper_js__WEBPACK_IMPORTED_MODULE_0__[\"EventEmitter\"] {\n  constructor() {\n    super();\n    \n    this.form = document.getElementById(\"todo-form\");\n    this.input = document.getElementById(\"add-input\");\n    this.list = document.getElementById(\"todo-list\");\n\n    this.form.addEventListener('submit', this.handleAdd.bind(this));\n  }\n\n  createElement(todo) {\n    const checkbox = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"input\", {\n      type: \"checkbox\",\n      className: \"checkbox\",\n      checked: todo.completed ? \"checked\" : \"\"\n    });\n    const label = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"label\", { className: \"title\" }, todo.title);\n    const editInput = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"input\", {\n      type: \"text\",\n      className: \"textfield\"\n    });\n    const editButton = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\n      \"button\",\n      { className: \"edit\" },\n      \"Изменить\"\n    );\n    const removeButton = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\n      \"button\",\n      { className: \"remove\" },\n      \"Удалить\"\n    );\n    const item = Object(_helper_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\n      \"li\",\n      {\n        className: `todo-item${todo.completed ? \" completed\" : \"\"}`,\n        \"data-id\": todo.id\n      },\n      checkbox,\n      label,\n      editInput,\n      editButton,\n      removeButton\n    );\n\n    return this.addEventListeners(item);\n  }\n\n  addEventListeners(listItem) {\n    const checkbox = listItem.querySelector(\".checkbox\");\n    const editButton = listItem.querySelector(\"button.edit\");\n    const removeButton = listItem.querySelector(\"button.remove\");\n\n    checkbox.addEventListener(\"change\", this.handleToggle.bind(this));\n    editButton.addEventListener(\"click\", this.handleEdit.bind(this));\n    removeButton.addEventListener(\"click\", this.handleRemove.bind(this));\n\n    return listItem;\n  }\n\n  handleAdd(event) {\n    event.preventDefault();\n\n    if (!this.input.value) return alert('Введите задачу!');\n\n    const value = this.input.value;\n\n    this.emit('add', value);\n  }\n\n  handleToggle({ target }) {\n      const listItem = target.parentNode;\n      const id = listItem.getAttribute('data-id');\n      const completed = target.checked;\n\n      this.emit('toggle', { id, completed });\n  }\n\n  handleEdit({ target }) {\n    const listItem = target.parentNode;\n    const id = listItem.getAttribute('data-id');\n    const label = listItem.querySelector(\".title\");\n    const input = listItem.querySelector(\".textfield\");\n    const editButton = listItem.querySelector(\"button.edit\");\n    const title = input.value;\n    const isEditing = listItem.classList.contains('editing');\n\n    if (isEditing) {\n        this.emit('edit', { id, title });\n    } else {\n        input.value = label.textContent;\n        editButton.textContent = 'Сохранить';\n        listItem.classList.add('editing');\n    }\n  }\n\n  handleRemove({ target }) {\n    const listItem = target.parentNode;\n    const id = listItem.getAttribute('data-id');\n\n    this.emit('remove', id);\n  }\n\n  show(todos) {\n    todos.forEach(todo => {\n      const listItem = this.createElement(todo);\n\n      this.list.appendChild(listItem);\n    })\n  }\n  \n  findListItem(id) {\n    return this.list.querySelector(`[data-id=\"${id}\"]`);\n  }\n\n  addItem(todo) {\n    const listItem = this.createElement(todo);\n\n    this.input.value = \"\";\n    this.list.appendChild(listItem);\n  }\n\n  toggleItem(todo) {\n    const listItem = this.findListItem(todo.id);\n    const checkbox = listItem.querySelector(\".checkbox\");\n\n    checkbox.checked = todo.completed;\n\n    if (todo.completed) {\n      listItem.classList.add(\"completed\");\n    } else {\n      listItem.classList.remove(\"completed\");\n    }\n  }\n\n  editItem(todo) {\n    const listItem = this.findListItem(todo.id);\n    const label = listItem.querySelector(\".title\");\n    const input = listItem.querySelector(\".textfield\");\n    const editButton = listItem.querySelector(\"button.edit\");\n\n    label.textContent = todo.title;\n    editButton.textContent = \"Изменить\";\n    listItem.classList.remove(\"editing\");\n  }\n\n  removeItem(id) {\n    const listItem = this.findListItem(id);\n\n    this.list.removeChild(listItem);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (View);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlldy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy92aWV3LmpzP2YwNzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgRXZlbnRFbWl0dGVyIH0gZnJvbSBcIi4vaGVscGVyLmpzXCI7XG5cbmNsYXNzIFZpZXcgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIFxuICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kby1mb3JtXCIpO1xuICAgIHRoaXMuaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1pbnB1dFwiKTtcbiAgICB0aGlzLmxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG8tbGlzdFwiKTtcblxuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLmhhbmRsZUFkZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQodG9kbykge1xuICAgIGNvbnN0IGNoZWNrYm94ID0gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgIGNsYXNzTmFtZTogXCJjaGVja2JveFwiLFxuICAgICAgY2hlY2tlZDogdG9kby5jb21wbGV0ZWQgPyBcImNoZWNrZWRcIiA6IFwiXCJcbiAgICB9KTtcbiAgICBjb25zdCBsYWJlbCA9IGNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJ0aXRsZVwiIH0sIHRvZG8udGl0bGUpO1xuICAgIGNvbnN0IGVkaXRJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XG4gICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0ZmllbGRcIlxuICAgIH0pO1xuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBjcmVhdGVFbGVtZW50KFxuICAgICAgXCJidXR0b25cIixcbiAgICAgIHsgY2xhc3NOYW1lOiBcImVkaXRcIiB9LFxuICAgICAgXCLQmNC30LzQtdC90LjRgtGMXCJcbiAgICApO1xuICAgIGNvbnN0IHJlbW92ZUJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImJ1dHRvblwiLFxuICAgICAgeyBjbGFzc05hbWU6IFwicmVtb3ZlXCIgfSxcbiAgICAgIFwi0KPQtNCw0LvQuNGC0YxcIlxuICAgICk7XG4gICAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoXG4gICAgICBcImxpXCIsXG4gICAgICB7XG4gICAgICAgIGNsYXNzTmFtZTogYHRvZG8taXRlbSR7dG9kby5jb21wbGV0ZWQgPyBcIiBjb21wbGV0ZWRcIiA6IFwiXCJ9YCxcbiAgICAgICAgXCJkYXRhLWlkXCI6IHRvZG8uaWRcbiAgICAgIH0sXG4gICAgICBjaGVja2JveCxcbiAgICAgIGxhYmVsLFxuICAgICAgZWRpdElucHV0LFxuICAgICAgZWRpdEJ1dHRvbixcbiAgICAgIHJlbW92ZUJ1dHRvblxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5hZGRFdmVudExpc3RlbmVycyhpdGVtKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKGxpc3RJdGVtKSB7XG4gICAgY29uc3QgY2hlY2tib3ggPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiLmNoZWNrYm94XCIpO1xuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLmVkaXRcIik7XG4gICAgY29uc3QgcmVtb3ZlQnV0dG9uID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5yZW1vdmVcIik7XG5cbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHRoaXMuaGFuZGxlVG9nZ2xlLmJpbmQodGhpcykpO1xuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlRWRpdC5iaW5kKHRoaXMpKTtcbiAgICByZW1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlUmVtb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIGxpc3RJdGVtO1xuICB9XG5cbiAgaGFuZGxlQWRkKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICghdGhpcy5pbnB1dC52YWx1ZSkgcmV0dXJuIGFsZXJ0KCfQktCy0LXQtNC40YLQtSDQt9Cw0LTQsNGH0YMhJyk7XG5cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaW5wdXQudmFsdWU7XG5cbiAgICB0aGlzLmVtaXQoJ2FkZCcsIHZhbHVlKTtcbiAgfVxuXG4gIGhhbmRsZVRvZ2dsZSh7IHRhcmdldCB9KSB7XG4gICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgY29uc3QgaWQgPSBsaXN0SXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlZCA9IHRhcmdldC5jaGVja2VkO1xuXG4gICAgICB0aGlzLmVtaXQoJ3RvZ2dsZScsIHsgaWQsIGNvbXBsZXRlZCB9KTtcbiAgfVxuXG4gIGhhbmRsZUVkaXQoeyB0YXJnZXQgfSkge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgY29uc3QgaWQgPSBsaXN0SXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICBjb25zdCBsYWJlbCA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGVcIik7XG4gICAgY29uc3QgaW5wdXQgPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiLnRleHRmaWVsZFwiKTtcbiAgICBjb25zdCBlZGl0QnV0dG9uID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcImJ1dHRvbi5lZGl0XCIpO1xuICAgIGNvbnN0IHRpdGxlID0gaW5wdXQudmFsdWU7XG4gICAgY29uc3QgaXNFZGl0aW5nID0gbGlzdEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0aW5nJyk7XG5cbiAgICBpZiAoaXNFZGl0aW5nKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZWRpdCcsIHsgaWQsIHRpdGxlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gbGFiZWwudGV4dENvbnRlbnQ7XG4gICAgICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSAn0KHQvtGF0YDQsNC90LjRgtGMJztcbiAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnZWRpdGluZycpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlbW92ZSh7IHRhcmdldCB9KSB7XG4gICAgY29uc3QgbGlzdEl0ZW0gPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICBjb25zdCBpZCA9IGxpc3RJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuXG4gICAgdGhpcy5lbWl0KCdyZW1vdmUnLCBpZCk7XG4gIH1cblxuICBzaG93KHRvZG9zKSB7XG4gICAgdG9kb3MuZm9yRWFjaCh0b2RvID0+IHtcbiAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5jcmVhdGVFbGVtZW50KHRvZG8pO1xuXG4gICAgICB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIH0pXG4gIH1cbiAgXG4gIGZpbmRMaXN0SXRlbShpZCkge1xuICAgIHJldHVybiB0aGlzLmxpc3QucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xuICB9XG5cbiAgYWRkSXRlbSh0b2RvKSB7XG4gICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmNyZWF0ZUVsZW1lbnQodG9kbyk7XG5cbiAgICB0aGlzLmlucHV0LnZhbHVlID0gXCJcIjtcbiAgICB0aGlzLmxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICB9XG5cbiAgdG9nZ2xlSXRlbSh0b2RvKSB7XG4gICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbSh0b2RvLmlkKTtcbiAgICBjb25zdCBjaGVja2JveCA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuY2hlY2tib3hcIik7XG5cbiAgICBjaGVja2JveC5jaGVja2VkID0gdG9kby5jb21wbGV0ZWQ7XG5cbiAgICBpZiAodG9kby5jb21wbGV0ZWQpIHtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJjb21wbGV0ZWRcIik7XG4gICAgfVxuICB9XG5cbiAgZWRpdEl0ZW0odG9kbykge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5maW5kTGlzdEl0ZW0odG9kby5pZCk7XG4gICAgY29uc3QgbGFiZWwgPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpO1xuICAgIGNvbnN0IGlucHV0ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcIi50ZXh0ZmllbGRcIik7XG4gICAgY29uc3QgZWRpdEJ1dHRvbiA9IGxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCJidXR0b24uZWRpdFwiKTtcblxuICAgIGxhYmVsLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcbiAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCLQmNC30LzQtdC90LjRgtGMXCI7XG4gICAgbGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImVkaXRpbmdcIik7XG4gIH1cblxuICByZW1vdmVJdGVtKGlkKSB7XG4gICAgY29uc3QgbGlzdEl0ZW0gPSB0aGlzLmZpbmRMaXN0SXRlbShpZCk7XG5cbiAgICB0aGlzLmxpc3QucmVtb3ZlQ2hpbGQobGlzdEl0ZW0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/view.js\n");

/***/ })

/******/ });