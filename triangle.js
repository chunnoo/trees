function triangle(p0, p1, p2) {
  this.points = [];
  this.points.push(p0);
  this.points.push(p1);
  this.points.push(p2);
  this.edges = [];
  this.edges.push(new edge(p0, p1));
  this.edges.push(new edge(p1, p2));
  this.edges.push(new edge(p2, p0));
}

triangle.prototype = {
  equal: function (tri) {
    if (this.points[0].equal(tri.points[0]) && this.points[1].equal(tri.points[1]) && this.points[2].equal(tri.points[2])) {
      return true;
    } else {
      return false;
    }
  },
  clockwise: function () {
    if ((this.points[1].x - this.points[0].x)*(this.points[1].y + this.points[0].y) +
        (this.points[2].x - this.points[1].x)*(this.points[2].y + this.points[1].y) +
        (this.points[0].x - this.points[2].x)*(this.points[0].y + this.points[2].y) > 0) {
      return true;
    } else {
      return false;
    }
  },
  insideCircumcircle: function (pt) {
    var mat = [
      [this.points[0].x - pt.x,
      this.points[0].y - pt.y,
      (Math.pow(this.points[0].x, 2) - Math.pow(pt.x, 2)) + (Math.pow(this.points[0].y, 2) - Math.pow(pt.y, 2))],
      [this.points[1].x - pt.x,
      this.points[1].y - pt.y,
      (Math.pow(this.points[1].x, 2) - Math.pow(pt.x, 2)) + (Math.pow(this.points[1].y, 2) - Math.pow(pt.y, 2))],
      [this.points[2].x - pt.x,
      this.points[2].y - pt.y,
      (Math.pow(this.points[2].x, 2) - Math.pow(pt.x, 2)) + (Math.pow(this.points[2].y, 2) - Math.pow(pt.y, 2))]];
    
    var det = -mat[0][2]*mat[1][1]*mat[2][0] + mat[0][1]*mat[1][2]*mat[2][0] + mat[0][2]*mat[1][0]*mat[2][1] - mat[0][0]*mat[1][2]*mat[2][1] - mat[0][1]*mat[1][0]*mat[2][2] + mat[0][0]*mat[1][1]*mat[2][2];
    
    if (this.clockwise()) {
      det = -det;
    }
    
    if (det > 0) {
      return true;
    } else {
      return false;
    }
  }
};