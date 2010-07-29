include('astarjs/functional');
include('astarjs/binaryheap');

function ReachedList() {
   var list = {};
   
   this.store = function(point, route) {
      list[point.hash()] = route;
      return;
   };
   
   this.find = function(point) {
      return list[point.hash()];
   };
   
   return this;
};


/** actual a*
 * @param {Object} map map instance
 **/
exports.findRoute = function(map, from, to) {
  var open = new BinaryHeap(routeScore);
  var reached = new ReachedList();

  function routeScore(route) {
    if (route.score == undefined)
      route.score = map.estimatedDistance(route.point, to) +
                    route.length;
    return route.score;
  }
  function addOpenRoute(route) {
    open.push(route);
    reached.store(route.point, route);
  }
  addOpenRoute({point: from,
                from: null,
                length: 0});

  while (open.size() > 0) {
    var route = open.pop();
    if (route.point.equals(to))
      return route;
    map.adjacent(route.point).forEach(function(direction) {
      var known = reached.find(direction);
      var newLength = route.length +
                      map.weightedDistance(route.point, direction);
      if (!known || known.length > newLength){
        if (known)
          open.remove(known);        
        addOpenRoute({point: direction,
                      from: route,
                      length: newLength});
      }
    });
  }
  return null;
}
