function point(x, y) {
  this.x = Math.floor(x);
  this.y = Math.floor(y);
}

point.prototype = {
  equal: function (pt) {
    if (this.x == pt.x && this.y == pt.y) {
      return true;
    } else {
      return false;
    }
  }
};

function closestPairOfPointsStep() {
  
}

function closestPairOfPoints(ptArr) {
  var ptArrHs = []; //Horisontally sorted indices of ptArr
  var ptArrVs = []; //Vertically sorted indices of ptArr
  
  for (var i = 0; i < ptArr.length; i++) {
    ptArrHs.push(i);
    ptArrVs.push(i);
  }
  
  ptArrHs.sort(function (a, b) {
    return this[a].x - this[b].x;
  }.bind(ptArr));
  
  ptArrVs.sort(function (a, b) {
    return this[a].y - this[b].y;
  }.bind(ptArr));
  
  return {Hs: ptArrHs, Vs: ptArrVs};
  
}
















