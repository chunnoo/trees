var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var frames = 0;

var mode = 1; //0 = bebug, 1 = generate, 2 = click to add point, 3 = click to add point widthin whole screen

var algorithm = 1; //0 = ?, 1 = triangulation, 2 = closest pair of pints

var numPoints = 64;

function generatePoints(numPts) {
  var ptArr = [];

  for (var i = 0; i < numPts; i++) {
    ptArr.push(new point(
      (Math.random())*canvas.width,
      (Math.random())*canvas.height));
    /*ptArr.push(new point(
      0.5*i*Math.cos(8*i*Math.PI/numPts + clicks/10)*(canvas.width - 10)/numPts + canvas.width*0.5,
      0.5*i*Math.sin(8*i*Math.PI/numPts + clicks/10)*(canvas.width - 10)/numPts + canvas.height*0.5));*/
    /*ptArr.push(new point(
      0.5*Math.cos(2*i*Math.PI/numPts + clicks*Math.PI/4)*(canvas.width - 10) + canvas.width*0.5,
      0.5*Math.sin(2*i*Math.PI/numPts + clicks*Math.PI/4)*(canvas.width - 10) + canvas.height*0.5));*/
    /*ptArr.push(new point(
      0.5*(Math.cos(i + 0.5*Math.PI) + 0.5*Math.cos(1.5*i + 0.5*Math.PI))*(canvas.width*0.5 - 5) + canvas.width*0.5,
      0.5*(Math.sin(i - 1.5*Math.PI) + 0.5*Math.sin(1.5*i + 1.5*Math.PI))*(canvas.width*0.5 - 5) + canvas.height*0.5));*/

    /*
    16*i*Math.pow(Math.sin(i), 3),
    -16*i*Math.pow((13/16)*Math.cos(i) - (5/16)*Math.cos(2*i) - (1/8)*Math.cos(3*i) - (1/16)*Math.cos(4*i), 1)

    16*i*(Math.cos(i + 0.5*Math.PI) + 0.5*Math.cos(1.5*i + 0.5*Math.PI))/1.5,
    -16*i*(Math.sin(i - 1.5*Math.PI) + 0.5*Math.sin(1.5*i + 1.5*Math.PI))/1.5,
    */
  }

  if (mode == 3) {
    ptArr.push(new point(0, 0));
    ptArr.push(new point(canvas.width, 0));
    ptArr.push(new point(canvas.width, canvas.height));
    ptArr.push(new point(0, canvas.height));
  }

  return ptArr;
}

var mouse = new point(0,0);
var clicks = 0;

if (algorithm == 1) {
  var triangulationOne = new triangulation(generatePoints(numPoints));
  triangulationOne.triangulate(canvas.width + 10, canvas.height + 10);
} else if (algorithm == 2) {
  var pointArray = generatePoints(numPoints);
  var tempSort = closestPairOfPoints(pointArray);
}

function draw(e) {
  frames++;
  //var time = frames/120;

  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (algorithm == 1) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.strokeStyle = "#fff";
    for (var i = 0; i < triangulationOne.triangles.length; i++) {
      ctx.beginPath();
      ctx.moveTo(triangulationOne.triangles[i].points[0].x, triangulationOne.triangles[i].points[0].y);
      ctx.lineTo(triangulationOne.triangles[i].points[1].x, triangulationOne.triangles[i].points[1].y);
      ctx.lineTo(triangulationOne.triangles[i].points[2].x, triangulationOne.triangles[i].points[2].y);
      ctx.closePath();

      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(triangulationOne.triangles[i].points[0].x, triangulationOne.triangles[i].points[0].y);
      ctx.lineTo(triangulationOne.triangles[i].points[1].x, triangulationOne.triangles[i].points[1].y);
      ctx.lineTo(triangulationOne.triangles[i].points[2].x, triangulationOne.triangles[i].points[2].y);
      ctx.closePath();

      ctx.stroke();
    }
  } else if (algorithm == 2) {
    for (var i = 0; i < pointArray.length; i++) {
      ctx.strokeStyle = "#fff";

      ctx.fillStyle = "rgba(" + Math.floor(i*255/pointArray.length) + ", 0, 0, 0.5)";
      ctx.beginPath();
      ctx.arc(pointArray[tempSort.Hs[i]].x, pointArray[tempSort.Hs[i]].y, 5, 0, Math.PI*2);
      ctx.closePath();
      ctx.fill()

      ctx.fillStyle = "rgba(0, " + Math.floor(i*255/pointArray.length) + ", 0, 0.5)";
      ctx.beginPath();
      ctx.arc(pointArray[tempSort.Vs[i]].x, pointArray[tempSort.Vs[i]].y, 5, 0, Math.PI*2);
      ctx.closePath();
      ctx.fill()
    }
  }

  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX - canvas.getBoundingClientRect().left;
  mouse.y = e.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener("click", function (e) {
  mouse.x = e.clientX - canvas.getBoundingClientRect().left;
  mouse.y = e.clientY - canvas.getBoundingClientRect().top;

  if (algorithm == 1) {
    if (mode == 1) {
      triangulationOne.points = generatePoints(numPoints);

      triangulationOne.triangulate(canvas.width + 10, canvas.height + 10);

    } else if (mode == 2) {
      triangulationOne.points.push(new point(mouse.x, mouse.y));

      triangulationOne.triangulate(canvas.width + 10, canvas.height + 10);
    } else if (mode == 3) {
      triangulationOne.points.push(new point(mouse.x, mouse.y));

      if (triangulationOne.triangles.length > 0) {
        triangulationOne.addPoint(triangulationOne.points[triangulationOne.points.length - 1]);
      } else if (triangulationOne.triangles.length == 0) {
        triangulationOne.triangulate(canvas.width + 10, canvas.height + 10);
      }
    }
  } else if (algorithm == 2) {
    pointArray = generatePoints(numPoints);
    tempSort = closestPairOfPoints(pointArray);
  }

  clicks++;
});

draw();
