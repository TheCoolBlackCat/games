var canvas, canvasContext;

var blueCar = new carClass("Blue Storm", carPic);
var greenCar = new carClass("Green Machine", otherCarPic);

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // Pre-load
  colorRect(0,0, canvas.width,canvas.height, "black");
  colorText("Loading...", canvas.width/2, canvas.height/2, "white");

  loadImages();
}

function imageLoadingDoneSoStartGame() {
  var framesPerSecond = 30;
  setInterval (updateAll, 1000/framesPerSecond);

  setupInput();
  loadLevel(levelOne);
}

function loadLevel(whichLevel) {
  trackGrid = whichLevel.slice(); // Copy array
  blueCar.reset();
  greenCar.reset();
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  blueCar.move();
  greenCar.move();
}

function drawAll() {
  drawTracks();
  blueCar.draw();
  greenCar.draw();
}
