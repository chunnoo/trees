var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var frames = 0;

var mode = 1; //0 = bebug, 1 = generate, 2 = click to add point, 3 = click to add point widthin whole screen

var numPoints = 64;

function generatePoints(numPts) {
  var ptArr = [];

  for (var i = 0; i < numPts; i++) {
    ptArr.push(new point(
      (Math.random())*canvas.width,
      (Math.random())*canvas.height));

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

var triangulationOne = new triangulation(generatePoints(numPoints));
triangulationOne.triangulate(canvas.width + 10, canvas.height + 10);

var treeOne = new tree(3);
treeOne.generateNodesFromTriangulation(triangulationOne, 0);

function draw(e) {
  frames++;
  //var time = frames/120;

  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  treeOne.recursiveTree(0, 3, ctx);
  ctx.stroke();

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
