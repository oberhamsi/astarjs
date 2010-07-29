var assert = require('assert');

var astar = require('astarjs');

exports.testSomething = function () {
    assert.isTrue(true);
};

if (require.main == module.id) {
    require('test').run(exports);
}
