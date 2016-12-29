function edge(p0, p1) {
  this.start = p0;
  this.end = p1;
}

edge.prototype = {
  equal: function (edg) {
    if ((this.start.equal(edg.start) && this.end.equal(edg.end)) || (this.start.equal(edg.end) && this.end.equal(edg.start))) {
      return true;
    } else {
      return false;
    }
  }
};