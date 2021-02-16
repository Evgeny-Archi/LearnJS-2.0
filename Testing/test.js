function sayName(name) {
    let message = 'My name: ' + name
    return message
}

let arr = [1, 2, 3, -4, 5, 0, 1]
let result = arr.reduce((acc, item) => {
    return acc + item
})

let assert = require('chai').assert

describe('sayName', function() {
    it('Get new phrase name', function() {
        assert.typeOf(sayName('John'), 'string')
    })
})

describe('arr', function() {
    it('Get summ from array', function() {
        assert.equal(result, 7)
    })
})