triangulation = function (pts) {
  this.points = pts;
  
  this.triangles = [];
  
  this.connections = [];
}

triangulation.prototype = {
  addPoint: function (pt) {
    
    var badTriangles = [];
    
    for (var i = 0; i < this.triangles.length; i++) { //find triangles that are not valid due to the new point
      
      
      if (this.triangles[i].insideCircumcircle(pt)) { //pt is inside circumcircle of triangulation[i]
        badTriangles.push(this.triangles[i]); //add triangulation[i] to badTriangles
      }
    }
    var polygon = [];
    
    for (var i = 0; i < badTriangles.length; i++) { //find the boundary of the polygonal hole
      for (var j = 0; j < 3; j++) { //add edge if it's not shared by other triangles
        var addEdge = true;
      
        for (var k = 0; k < badTriangles.length; k++) {
          if (i != k) {
            for (var l = 0; l < 3; l++) {
              if (badTriangles[i].edges[j].equal(badTriangles[k].edges[l])) {
                addEdge = false;
                break;
              }
            }
          }
        }
        if (addEdge) {
          polygon.push(badTriangles[i].edges[j]);
        }
      }
    }
    for (var i = 0; i < badTriangles.length; i++) { //remove badTriangles from triangulation
      for (var j = 0; j < this.triangles.length; j++) {
        if (badTriangles[i].equal(this.triangles[j])) {
          this.triangles.splice(j, 1);
          break;
        }
      }
    }
    for (var i = 0; i < polygon.length; i++) { //re-triangulate polygonal hole
      this.triangles.push(new triangle(pt, polygon[i].start, polygon[i].end)); //triangle from pt and each edge in polygon
    }
  },
  triangulate: function (w, h) {
    this.triangles = [];
    
    if (this.points.length >= 3) {
      var temp0 = new point(-w, -h);
      var temp1 = new point(w*2, -h);
      var temp2 = new point(w*0.5, h*2);
      var tempTriangle = new triangle(temp0, temp1, temp2);
      
      this.triangles.push(tempTriangle); //add super-triangle to triangulation
      
      for (var i = 0; i < this.points.length; i++) {
        this.addPoint(this.points[i]);
      }
      
      for (var i = 0; i < this.triangles.length; i++) { //clean up
        for (var j = 0; j < 3; j++) {
          if (this.triangles[i].points[j].equal(temp0) || this.triangles[i].points[j].equal(temp1) || this.triangles[i].points[j].equal(temp2)) {
            this.triangles.splice(i,1);
            i--;
            break;
          }
        }
      }
    }
  }
}





