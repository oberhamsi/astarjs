include('ringo/unittest');
var astar = require('astarjs');

exports.testSomething = function () {
    assertTrue(true);
};

if (require.main == module.id) {
    require('ringo/unittest').run(exports);
}
